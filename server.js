const express = require("express");

const userRouter = require("./users/userRouter");

const port = 8080;

const server = express();

server.use(express.json());
server.use(userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = () => {
  return (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`${time} ${req.method} ${req.url}`);
    next();
  };
};

module.exports = server;
