const express = require("express");
const userRoute = require("./users/users-router.js");
const postRoute = require("./posts/posts-router");
const server = express();
const { logger } = require("./middleware/middleware");

server.use(express.json());
server.use(logger);
server.use("/api/users", userRoute);
server.use("/api/posts", postRoute);

server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
