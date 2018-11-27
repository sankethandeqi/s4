const express = require("express");
const bodyParser = require("body-parser");
const eventEmitter = require("./utils/event");
const FileRouter = require("./routes/file.route");
const { httpPort } = require("./config/config");
const processQueue = require("./utils/queue");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

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

// start listening
server.listen(httpPort);

// Listener for DB connection successful event
eventEmitter.on("DB_CONN_SUCCESS", () => {
    processQueue();
});

io.on("connection", function(socket) {
    console.log(`Connection established ${socket.id}`);
    // socket.emit("request", /* */); // emit an event to the socket
    // io.emit("broadcast", /* */); // emit an event to all connected sockets
    // socket.on("reply", function(){ /* */ }); // listen to the event
});

eventEmitter.on("UPLOADED_S3", data => {
    io.sockets.connected[data.socketId].emit("UPLOADED_S3", data);
});