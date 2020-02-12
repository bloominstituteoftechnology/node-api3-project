//  importing a CommonJS module
const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

//  importing 3rd party MW
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();
//global middleware
server.use(express.json()); //  built-in MW

server.use(helmet());
server.use(morgan);

//  custom middleware
function logger(req, res, next) {
  console.log(
    `${req.method} Request to ${
      req.originalUrl
    } at ${new Date().toISOString()} `
  );
  next();
}

function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(500).json({ message: "No user exists with specified ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "ID required" });
    });

  function validateUser(req, res, next) {
    if (req.body) {
      if (req.body.name) {
        next();
      } else {
        res.status(400).json({ message: "Missing Name" });
      }
    } else {
      res.status(400).json({ message: "Missing User Data" });
    }
  }

  function validatePost(req, res, next) {
    if (req.body) {
      if (req.body.text) {
        next();
      } else {
        res.status(400).json({ message: "Missing required text field" });
      }
    } else {
      res.status(400).json({ message: "Missing post data" });
    }
  }
}

server.use(logger);
server.use("./api/user", userRouter);
server.use("./api/post", postRouter);

module.exports = server;
