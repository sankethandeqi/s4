const config = require("../config/config");
const multer  = require("multer");
let uploadObj = multer({dest: config.uploadDir}).single("resource");
var kue = require("kue")
    , queue = kue.createQueue();
const { FileModel } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function remove(req, res) {
    const id = req.params.id;
    // add to queue
    const job = queue.create("s3", {
        title: `S3 delete file id ${id}`,
        action: "DELETE",
        id
    })
        .save(err => {
            if (err) {
                return res.send({
                    err
                });
                
            }

            res.send({
                data: {                    
                    job_id: job.id
                },
                success: true
            });            
        });
}

/**
 * @api {post} /v1/files/ Upload file to S3
 * @apiGroup Files
 * @apiName UploadFile
 */
function upload(req, res) {
    uploadObj(req, res, async function (err) {
        if (err) {
            return res.send({
                err
            });
        }

        // save to database
        const file = await FileModel.create({
            etag: "", // create with empty etag
            size: req.file.size,
            name: req.file.originalname,
            local_path: req.file.path,
            socket_id: req.body.socketId
        });
        
        // add to queue
        const job = queue.create("s3", {
            title: `S3 file upload for db file id ${file.dataValues.id}`,
            id: file.dataValues.id,
            action: "UPLOAD"
        })
            .save(err => {
                if (err) {
                    return res.send({
                        err
                    });
                    
                }
    
                res.send({
                    success: true,
                    data: {                        
                        id: file.dataValues.id,
                        job_id: job.id
                    }
                });            
            });
    });
}

/**
 * @api {get} /v1/files/ Get all files list
 * @apiGroup Files
 * @apiName GetAllFiles
 */
async function getAll(req, res) {
    //const data = await listObjects(config.bucketName);    
    const allFiles = await FileModel.findAll({
        where: {
            deleted: 0,
            etag: {
                [Op.ne]: ""
            }
        }
    });
    res.send({
        data: {
            files: allFiles
        }
    });
}

module.exports = {
    upload,
    getAll,
    remove
};