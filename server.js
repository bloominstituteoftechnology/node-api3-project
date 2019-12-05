const express = require('express');
const helmet = require("helmet")
const server = express();
const userRoutes = require("./users/userRouter")

server.use(helmet());


// server.get("/echo", (req, res)=> {
//   res.send(req.headers);
// })
// //custom middleware

// function logger(req, res, next) {
//   console.log(`${req.method} to ${req.originalUrl}`)// allows the req to continue to the next middleware or route handler
// }

const logger = (req, res, next) => {
  console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
  next();
}
server.use(express.json());

server.use(logger)

server.use("/api/users", userRoutes)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
// function logger(req, res, next) {
//   const { method, url } = req;

// console.log(
//   JSON.stringify({
//     timestamp: Date.now(),
//     method,
//     url
//   })
// );
// // res.end()}


module.exports = server;
