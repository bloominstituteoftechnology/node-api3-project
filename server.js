const express = require('express');

const usersRouter = require("./users/userRouter.js");

const postsRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json()); 

server.use("/api/users", logger, usersRouter);

server.use("/api/posts", logger, postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {

  const today = new Date().toISOString(); // YYYY-MM-DD
    console.log(`[${today}] ${req.method} to ${req.originalUrl}`);
  
   next();
}

module.exports = server;
