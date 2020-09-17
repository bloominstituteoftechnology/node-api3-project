const express = require("express");
const welcomeRoute = require("./routers/welcomeRoute");
const logger = require("./middleware/globalMiddleware");

const server = express();
const port = 8080;

server.use(express.json());
// Custom Middlware
server.use(logger());

// Routers
server.use(welcomeRoute);

// Listen for the call on my local port
server.listen(port, () => {
  console.log(`Listening on port ${8080}`);
});
