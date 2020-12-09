// code away!
const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

const port = 5000;

server.use(express.json());

server.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`);

    next();
})

server.use(userRouter);
server.use(postRouter);

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
});