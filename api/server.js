const express = require("express");
const postsRouter = require("./posts/posts-router");

const server = express();
server.use(express.json());

// remember express by default cannot parse JSON in request bodies
server.use("/api/posts", postsRouter);

server.get("/posts", (req, res) => {
  res.send(
    "<h2> Let's write some middleware! </h2> <p>Lambda student: Stan Tudor</p>"
  );
});

// global middlewares and the user's router need to be connected here
server.use(function (req, res) {
  res.status(404).send("Aint nobody got tie for that");
});

module.exports = server;
