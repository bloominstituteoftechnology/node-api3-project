const express = require('express');
const usersRouter = require("/api/users-router.js");
const postsRouter = require("/api/posts-router.js");
const server = express();

server.use(express.json()); 
server.use("/api/users-router", logger, usersRouter);
server.use("/api/posts-router", logger, postsRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  const today = new Date().toISOString(); // YYYY-MM-DD
    console.log(`[${today}] ${req.method} to ${req.originalUrl}`);
  next();
}

module.exports = server;
