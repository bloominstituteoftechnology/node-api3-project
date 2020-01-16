const express = require('express');
const userRouter = require('./users/userRouter')
// const postRouter = require('./posts/postRouter')

const server = express();
server.use(express.json())

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware

// function logger(req, res, next) {}

server.use(userRouter)

module.exports = server;
