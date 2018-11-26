/**
 * This is for production use
 * Whatever values you provide here will override the default in ./config.js
 * So for examply httpPort for production will go here
 */
module.exports = {
    httpPort: process.env.PORT || 3000
};
