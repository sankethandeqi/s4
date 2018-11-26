const fs = require("fs");
const kue = require("kue")
    , queue = kue.createQueue();
const config = require("../config/config");
const { FileModel } = require("../db");
const { addToBucket } = require("./s3");

module.exports = () => {
    queue.process("s3", async function(job, done) {
        try {
            console.log("Starting queue");
            const fileObj = await FileModel.findByPk(job.data.id);
            
            // Set status as sending
            fileObj.status = 1;
            await fileObj.save();
            
            // send to AWS
            const data = await addToBucket(
                config.bucketName,
                fileObj.local_path,
                `${fileObj.id}-${fileObj.name}`
            );
            console.log("data after uploading s3");
            console.log(data);
            
            // set status as sent
            fileObj.status = 2;
            fileObj.etag = data.ETag.replace(/['"]+/g, "");
            await fileObj.save();
            
            // delete local file            
            fs.unlinkSync(fileObj.local_path);
            
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