const express = require("express");
const data = require("./users/userRouter");

const server = express();

server.use(logger);
server.use(express.json());
server.use(data);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong!" });
});

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const end = req.originalUrl;
  let date = new Data();
  console.log(`${method} to ${end} at ${date}`);
  next();
}

module.exports = server;
