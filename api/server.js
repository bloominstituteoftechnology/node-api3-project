const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const postsRoutes = require("./posts/postsRoutes");
const usersRoutes = require("./users/usersRoutes");

const server = express();
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use("/api/posts", postsRoutes);
server.use("/api/users", usersRoutes);
// global middlewares and the user's router need to be connected here
const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.methods}`);
  next();
};
server.get("/", loggerMiddleware, (req, res) => {
  res.send(
    "<h2> Let's write some middleware! </h2> <p>Lambda student: Stan Tudor</p>"
  );
});

// const addSomeMiddleware = (req, res, next) => {
//   req.username = req.query.username || "Visitor";

//   next();
// };
// server.get("/", addSomeMiddleware, (req, res) => {
//   res.send(
//     `<h2> Let's write some middleware!
//     </h2> <p>Lambda student: Stan Tudor</p>`
//   );
// });

// server.use((err, req, res, next) => {
//   next();
//   const message = err?.errorMessage || "Something went wrong";
//   res.status(500).json({ message });
// });

server.use(function (req, res) {
  res.status(404).send("Aint nobody got time for that");
});

module.exports = server;
