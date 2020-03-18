const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.listen(5000, () => console.log("API is running on port 5000"));