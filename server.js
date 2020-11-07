const express = require('express');
const UserRouter = require('./users/userRouter');
const helmet = require('helmet')

const server = express();

server.use(express.json());
server.use(logger);
server.use(helmet());

server.use('/', UserRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {


  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log(`${req.method} Request 
  Time: ${dateTime} 
  URL: localhost:4005${req.url}`);
  next();
}

module.exports = server;
