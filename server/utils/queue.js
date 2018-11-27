const fs = require("fs");
const kue = require("kue")
    , queue = kue.createQueue();
const config = require("../config/config");
const { FileModel } = require("../db");
const { addToBucket, deleteFromBucket } = require("./s3");
const eventEmitter = require("../utils/event");

module.exports = () => {
    queue.process("s3", async function(job, done) {
        try {
            const fileObj = await FileModel.findByPk(job.data.id);
            if (job.data.action == "UPLOAD") {
                // Set status as sending
                fileObj.status = 1;
                await fileObj.save();
                
                // send to AWS
                const data = await addToBucket(
                    config.bucketName,
                    fileObj.local_path,
                    `${fileObj.id}-${fileObj.name}`
                );
                
                // set status as sent
                fileObj.status = 2;
                fileObj.etag = data.ETag.replace(/['"]+/g, "");
                await fileObj.save();

                // delete local file            
                fs.unlinkSync(fileObj.local_path);
            } else if (job.data.action == "DELETE") {
                console.log("In delte queue");
                await deleteFromBucket(
                    config.bucketName,
                    `${fileObj.id}-${fileObj.name}`
                );

                // update soft delete flag in db
                fileObj.deleted = 1;
                await fileObj.save();
                console.log("Save", job.data.id);
            }
            
            // emit event for listeners to take a note
            // registered listener will push socket notification to client
            eventEmitter.emit(
                "S3_EVENT",
                {
                    socketId: fileObj.socket_id,
                    name: fileObj.name,
                    id: fileObj.id,
                    action: job.data.action
                }
            );
            
            // call done without any error
            done();
        } catch(err) {
            const fileObj = await FileModel.findByPk(job.data.id);            
            // set status as sent
            fileObj.status = 2;
            await fileObj.save();

            done(err);
        }
    });
};