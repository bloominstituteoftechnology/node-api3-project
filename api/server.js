const express = require('express');
const userRouter = require("./users/users-router.js")
const cors = require("cors")

const server = express();
server.use(cors())
server.use(express.json())

server.use("/api/users", userRouter)

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
