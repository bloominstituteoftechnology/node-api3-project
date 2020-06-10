const express = require('express');

const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
//middleware
const logger = require("./middleware/logger")

server.use(express.json());
server.use(logger());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   const time = new Date().toISOString()
//   console.log(`[${time}] ${req.method} ${req.url}`)
//   next()
// }

module.exports = server;