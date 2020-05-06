const express = require('express');
const morgan = require("morgan");
const helmet = require("helmet");

const userRouter = require("./users/userRouter");

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// global middleware
server.use(express.json()); // built in middleware, no need to npm install it
server.use(morgan("combined")); // third party
server.use(helmet());


//routes end poitns
server.use("/api/users", userRouter);
//custom middleware

function logger(req, res, next) {
     const today = new Date().toISOString(); // YYYY-MM-DD
   console.log(`[${today}] ${req.method} to ${req.url}`
   );
   next();
};

module.exports = server;
