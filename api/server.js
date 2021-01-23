const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const postsRouter = require('./posts/posts-router.js')
const { validatePost } = './middleware/middleware.js'
const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here


server.use(express.json())
server.use(helmet());
server.use(cors());
server.use((req,res,next) =>{
  console.log('Welcome To the Middleware Projects App')

  next();

})


const postsRouterPipeline = [logger,logger,logger]
server.use('/api/posts', postsRouterPipeline, postsRouter )

server.get('/', (req, res) => {
  const textIn = (req.text) ? ` ${req.text}` : 'NA';
  res.send(`<h2>Post Says ${textIn}!</h2>`);
});



module.exports = server;


function logger(req, res, next) {
  console.log('falling into posts router')
  next()
}
