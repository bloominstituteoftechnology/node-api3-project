const express = require('express');
const helmet = require('helmet');
const middleware = require('./midWare.js');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
server.use(express.json());
server.use(helmet());

server.use(middleware.logger)
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
// server.use(middleware.addName);

server.get('/', (req, res) => {
  
  res.send(`

  <div style = 
 "
    display: flex;
    flex-direction: column;

    align-items: center;
    
    "
  >
  <div>
  <h1> Custom Middleware is located in the midWare.js file</h1>
  </div>
  <div>
  <h2>An API created by John Rossi</h2>
  </div>
  <p style = "color: red">For users, use /api/users (/:id )</p>
  <p style = "color: red">For posts, use /api/posts (/:id)</p>
  </div>
  `);
  console.log('from /')
});

//custom middleware



module.exports = server;
