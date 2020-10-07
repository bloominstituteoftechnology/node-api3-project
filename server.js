const express = require('express');
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
//require other middleware here
const logger = require("./middleware/logger");
const validateUser = require("./middleware/validateUser");

const server = express();

server.use(express.json());
//Put use of other middleware here
//Logger is first on purpose I think
server.use(logger); 
// server.use(validateUser);
server.use("/users", userRouter);

// server.use(postRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}

//Remember this
module.exports = server;
