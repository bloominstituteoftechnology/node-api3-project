const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

const logger = (req,res, next) => {
  let current_datetime = new Date();
  let formatted_date =
      current_datetime.getFullYear() + "-" +
      current_datetime.getMonth() + "-" +
      current_datetime.getHours() + ":" +
      current_datetime.getMinutes() + ":" +
      current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = req.statusCode;
  let log = `[${formatted_date}]
  ${method}:${url} ${status}`;
  console.log(log);
  next();
}

module.exports = server, logger;
