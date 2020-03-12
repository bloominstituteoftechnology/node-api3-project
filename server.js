const express = require('express');



const logger = require('./middleware/logger.js');
const validateUserId = require('./middleware/validateUserId.js');
const validateUser = require('./middleware/validateUser.js');
const validatePost = require('./middleware/validatePost');

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");
const server = express();
server.use(express.json());

// server.use(logger);
// server.use(validateUserId);
// server.use(validateUser);
// server.use(validatePost);


server.use("/api/users", logger, userRouter)
server.use("/api/posts", logger, postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

module.exports = server;
