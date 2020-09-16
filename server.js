const express = require('express');
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const server = express();


//Express built-in middleware:express.json
//parses incomming requests with JSON payloads
server.use(express.json())

//Logger middleware
server.use(logger)

//userRouter and postRouters for user and post resources
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


function logger(req, res, next) {
const method = req.method
const endpoint = req.url 
const date = Date(Date.now())
const newDate = date.toString()
console.log(`${newDate} ${method} to ${endpoint}`)
next()  
//next() is to jump to next middleware and prevent timeouts
}

module.exports = server;
