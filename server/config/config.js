const prodConfig = require("./config.prod");

const defaultConfig = {
    db: {
        host: "localhost",
        name: "s4",
        user: "root",
        password: "m!grate"
    },

    // aws bucket name
    // TODO - Provision to provide credentials
    // Currrently credentials are captures from ~/.aws/credentials file
    bucketName: "qi-test-bucket",

    // upload directory with trailing slash
    uploadDir: "uploads/"
};

module.exports = {
    ...defaultConfig,
    ...prodConfig
};