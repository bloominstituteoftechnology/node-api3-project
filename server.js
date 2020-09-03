const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const userRouter = require('./users/userRouter')


const server = express();

server.use(express.json()); // built-in middleware
server.use(helmet()); // third pary mw, needs to be installed from npm
server.use(logger());



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter)
//custom middleware

function logger() {
  return (req, res, next) => {
      console.log(`a ${req.method} request was made to ${req.url}`);

      next();
  };
}

module.exports = server;
