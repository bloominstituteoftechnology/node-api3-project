const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

// ### Middleware ### 
const cm = require('./middleware/middleware')

// ### Logger ### 
const logger = cm.logger

// ### USER & POST API Router 
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

// ### Body Parser
server.use(helmet(), logger, express.json(), cors());

// ### API Routes
server.use('/posts', postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome to the API!</h2>`);
});


module.exports = server;