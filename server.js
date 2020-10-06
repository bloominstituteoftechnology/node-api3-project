const express = require('express');
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
//require other middleware here

const server = express();

server.use(express.json());
//Put use of other middleware here
server.use(userRouter);
server.use(postRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
