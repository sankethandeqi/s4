/**
 * This is for production use
 * Whatever values you provide here will override the default in ./config.js
 * So for examply httpPort for production will go here
 */
module.exports = {
    httpPort: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};
