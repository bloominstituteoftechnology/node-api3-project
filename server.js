require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter");

const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

//=======Global Middleware========================
server.use(cors());
const middleware = [express.json(), helmet(), morgan("dev")];
const customMiddleware = [logger];
server.use(middleware, customMiddleware);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

//=======end of Global Middleware=================

const motd = process.env.MOTD;
server.get("/", (req, res) => {
  res.send(`<h2>${motd}</h2>`);
});

//custom middleware
/*
logger()

logger logs to the console the following information about each request: request method, request url, and a timestamp
this middleware runs on every request made to the API
*/

function logger(req, res, next) {
  const URL = req.protocol + ":" + "//" + req.get("host") + "/" + req.path;

  console.log(`Request Method: ${
    req.method
  }, URL: ${URL}, timestamp: ${new Date().toISOString()}
  `);

  next();
}

module.exports = server;
