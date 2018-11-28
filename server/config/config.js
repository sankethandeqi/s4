const prodConfig = require("./config.prod");

const defaultConfig = {
    db: {
        host: "",
        name: "",
        user: "",
        password: ""
    },

    // aws bucket name
    // TODO - Provision to provide credentials
    // Currrently credentials are captures from ~/.aws/credentials file
    bucketName: "qi-test-bucket",

    // upload directory with trailing slash
    uploadDir: "uploads/",
    
    JWTKey: "S@M$ram333!<>N"
};

module.exports = {
    ...defaultConfig,
    ...prodConfig
};