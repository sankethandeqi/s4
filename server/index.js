const express = require("express");
const bodyParser = require("body-parser");
const eventEmitter = require("./utils/event");
const jwtMiddleware = require("./middlewares/jwt.middleware");
const AuthRouter = require("./routes/auth.route");
const FileRouter = require("./routes/file.route");
const { UserSocketModel } = require("./db");
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
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

// router rules for auth
app.use("/v1/auth", AuthRouter);

// NOTE - we are using jwtMiddleware after auth
// this is to skip token checks for auth routes
app.use(jwtMiddleware);

app.use("/v1/files", FileRouter);

// custom error handlers
// this will also catch async errors since we are usign express-async-errors
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.log(err);
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

    socket.on("disconnect", async function() {
        console.log(`Got disconnect ${socket.id}!`);
        await UserSocketModel.destroy({
            where: {
                socket_id: socket.id
            }
        });
    });
});

eventEmitter.on("S3_EVENT", async data => {
    console.log("Sending S3_EVENT", data);
    const allUserSockets = await UserSocketModel.findAll({
        where: {
            user_id: data.userId
        }
    });
    for (let userSocket of allUserSockets) {
        //io.sockets.connected[data.socketId].emit("S3_EVENT", data);
        if (userSocket.socket_id in io.sockets.connected) {
            io.sockets.connected[userSocket.socket_id].emit("S3_EVENT", data);
        }
    }
});