const express = require("express");
const helmet = require("helmet");

const server = express();
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.ip}`
  );

  next();
}

server.use(express.json());
server.use(logger);
server.use(helmet());

server.use("/api/users", userRouter);

server.use((error, req, res, next) => {
  res.status(error.code).json(error);
});

server.listen(4000, () => {
  console.log("server is listening on port 4000");
});
