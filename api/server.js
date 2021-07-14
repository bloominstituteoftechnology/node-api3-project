const express = require("express");
const { logger } = require("./middleware/middleware");

const server = express();
// remember express by default cannot parse JSON in request bodies
server.use(express.json());

server.use(logger);
// global middlewares and the user's router need to be connected here
server.get("/", (req, res) => {
  res.send("<h2> Lets write some middlware here </h2>");
});
// server.use(function (req, res) {
//   res.status(404).send("Aint nobody got time for that");
// });

module.exports = server;
