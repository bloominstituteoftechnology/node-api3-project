const express = require('express');

const userRoutes = require("./users/userRouter");
const postRoutes = require("./posts/postRouter");
const logger = require("./middleware/logger.js");

const server = express();

// middleware
server.use(logger);
server.use(helmet());
server.use(express.json());

module.exports = server;