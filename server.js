const express = require('express');

const server = express();
server.use(logger);
server.use(express.json()); //need for put and post so server can read json

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

const postRouter = require('./posts/postRouter.js');

server.use('/api/posts/', postRouter);

const userRouter = require('./users/userRouter.js');

server.use('/api/users/', userRouter);



//custom middleware

function logger(req, res, next) {
  // console.log(req);
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

const port = 8001;
server.listen(port, () => console.log(`api running on port ${port}`));