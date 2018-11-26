const express = require("express");
const bodyParser = require("body-parser");
const eventEmitter = require("./utils/event");
const FileRouter = require("./routes/file.route");
const { httpPort } = require("./config/config");
const processQueue = require("./utils/queue");
//const path = require("path");
const app = express();

// let's have documentation at the root
app.use(express.static("doc"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

// router rules for auth
app.use("/v1/files", FileRouter);

// custom error handlers
// this will also catch async errors since we are usign express-async-errors
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    res.status(500).send({
        error: ["Unexpected error occurred"]
    });
});

app.listen(httpPort, () => {
    console.log(`S4 app listening on port ${httpPort}!`);
});

// Listener for DB connection successful event
eventEmitter.on("DB_CONN_SUCCESS", () => {
    console.log("DB_CONN_SUCCESS triggered");
    processQueue();
});
