const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send('server is running');
})

server.listen(5000, () => console.log("API is running on port 5000"));

module.exports = server