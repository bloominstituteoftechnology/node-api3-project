const express = require("express");
const welcomeRoute = require("./routers/welcomeRoute");
const userRoutes = require("./routers/userRouter");
const { logger, errorHandler } = require("./middleware/globalMiddleware");

const server = express();
const port = 8080;
// --------------------- MIDDLEWARE QUEUE ---------------------
server.use(express.json());
// Custom Middlware
server.use(logger());

// Routers Middlware
server.use("/users", userRoutes);
server.use(welcomeRoute);

// Error Handling Middleware
server.use(errorHandler());
// --------------------- MIDDLEWARE QUEUE ---------------------

// Listen for the call on my local port
server.listen(port, () => {
  console.log(`Listening on port ${8080}`);
});
