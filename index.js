const express = require("express")
const morgan = require("morgan")
const welcomeRouter = require("./welcome/welcomeRouter")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postDb")

const logger = require("./middleware/logger")


const server = express();
const port = 5000;

server.use(express())

server.use(logger())

server.use(welcomeRouter);
server.use(userRouter);
server.use(postRouter);

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: " SOMETHING WENT WRONG",
    })
})



server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})