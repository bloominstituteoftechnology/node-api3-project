const express = require("express");

const server = express();

const port = process.env.PORT || 5000;

const userRouter = require("./users/userRouter");

const postRouter = require("./posts/postRouter");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Its Working!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(
    `A new [${req.method}] request was made to [${req.url}] at [${today}] `
  );
  next();
}

server.use(logger);
function validateUserId(req, res, next) {}
function validateUser(req, res, next) {}
function validatePost(req, res, next) {}

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

server.use((req, res) => {
  res.status(404).json({ message: "You have reached an invalid URL" });
});

module.exports = server;
