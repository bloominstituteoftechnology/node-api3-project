const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./users/users-router");
const postRouter = require("./posts/posts-router");
const mw = require("./middleware/middleware");
const server = express();

server.use(helmet());
// remember express by default cannot parse JSON in request bodies
server.use(express.json(), morgan("dev"));
// global middlewares and routes need to be connected here
server.use(cors());

server.use(mw.logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(function (req, res) {
    res.status(404).send("Wrong way! Go back!!!");
});

module.exports = server;
