const aws = require("aws-sdk");
const s3 = new aws.S3();
const fs = require("fs");

/**
 * Add specified resource to specified bucket
 * 
 * @param {string} bucketName Name of the bucket
 * @param {string} pathToResource Path to the file to be uploaded
 * 
 * @return Promise object
 * 
 * @usage await addToBucket('some-bucket', '/home/johndoe/pic.jpg')
 */
function addToBucket(bucketName, pathToResource, uniqueFileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToResource, (err, data) => {
            // if error while reading file then reject
            if (err) {
                return reject(err);
            }
            
            // start uploading the file
            s3.putObject(
                {
                    Bucket: bucketName,
                    Key: uniqueFileName,
                    Body: data
                    //Body: JSON.stringify(data, null, 2)
                },
                (err, data) => {
                    if (err) {                    
                        return reject(err);
                    }
                    
                    resolve(data);                    
                }
            );
        });
    });    
}

/**
 * List all objects in a bucket
 *
 * @param {string} bucketName Name of the bucket
 * @param {number} max Max number of records
 */
function listObjects(bucketName, max=10) {
    return new Promise((resolve, reject) => {
        s3.listObjects(
            {
                Bucket: bucketName, 
                MaxKeys: max
            },
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );  
    });
}

function downloadFileLocally(bucketName, keyName, downloadToFilePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(downloadToFilePath);
        s3
            .getObject({
                Bucket: bucketName,
                Key: keyName
            })
            .createReadStream()
            .on("error", function(err) {
                reject(err);
            })
            .on("end", () => {
                resolve();
            })
            .pipe(file);
    });
}

module.exports = {
    addToBucket,
    listObjects,
    downloadFileLocally
};