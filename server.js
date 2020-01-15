const express = require('express');

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')
const server = express();

// runs for every route
server.use(express.json())
server.use(logger)

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  // not getting run
  // console.log('here')
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {

    const { method, originalUrl } = req
    console.log(`${method} to ${originalUrl}`)
    next()
}

module.exports = server;
