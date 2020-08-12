// code away!
const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const logger = require("./middleware/logger");

const server = express();
const port = 4000;

server.use(express.json());


server.use(logger());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
