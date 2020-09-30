const express = require('express');
const userRouter = require("./users/userRouter");

const server = express();
server.use(express.json());
server.use("/api/users/", userRouter);

//custom middleware

const logger = (request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} to ${request.url} ${request.get("Origin")}`)
  next();
}
server.use(logger)


server.get('/', (request, response) => {
  response.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
