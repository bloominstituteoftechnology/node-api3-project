// require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());
server.use(cors());
server.use(logger);

server.use("/users", userRouter);
server.use("/posts", postRouter);

server.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome ${process.env.COHORT}`,
    fact: process.env.FUN_FACT || "I have no fun facts",
  });
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${new Date().toISOString()} ${req.ip} ${req.method} ${req.url} `
  );

  next();
}

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
module.exports = server;
