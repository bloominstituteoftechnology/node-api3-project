const express = require('express');
const postsRouter = require('./posts/posts-router')
const server = express();
const helmet = require('helmet');
const cors = require('cors')


// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(helmet());
server.use(cors());
// global middlewares and routes need to be connected here
server.use('/api/posts', postsRouter)
// server.use('/api/users')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger() {

}


module.exports = server;
