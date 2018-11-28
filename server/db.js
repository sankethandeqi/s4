const Sequelize = require("sequelize");
const config = require("./config/config");
const FileModel = require("./models/file.model");
const GoogleUserModel = require("./models/googleUser.model");
const UserSocketModel = require("./models/userSocket.model");

// After successful establishment of DB conection we trigger an event
const eventEmitter = require("./utils/event");

// initialize database connection
const sequelize = new Sequelize(
    config.db.name, // database name
    config.db.user, // user
    config.db.password, // password
    {
        host: config.db.host,
        dialect: "mysql",
        operatorsAliases: false,
        timezone: "+00:00",
        logging: false // if true then Sequelize logs every SQL query
    }
);

// check database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Database Connection established successfully!!");

        // Listener for below even is registered in index.js
        eventEmitter.emit("DB_CONN_SUCCESS");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });
    
// all models will go here
const File = FileModel(sequelize, Sequelize);
const GoogleUser = GoogleUserModel(sequelize, Sequelize);
const UserSocket = UserSocketModel(sequelize, Sequelize);

// export all models
module.exports = {
    "FileModel": File,
    "GoogleUserModel": GoogleUser,
    "UserSocketModel": UserSocket,
};
