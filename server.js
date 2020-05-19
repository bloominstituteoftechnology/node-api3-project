const express = require('express');
const mw = require('./build/middleware');
// const cors = require ('cors');
// const helmet = require('helmet');

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const server = express();
const logger = mw.logger;

server.use(express.json(),logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/',logger, (req,res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   const method = req.method
// 	const endpoint = req.originalUrl
// 	const date = new Date()
// 	console.log(`You made a ${method} request to ${endpoint} on ${date}`)
// 	next()
// }



module.exports = server;
