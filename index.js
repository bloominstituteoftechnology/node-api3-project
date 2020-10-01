const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send('server is running');
})

server.listen(port, () => console.log("API is running on port 5000"));

module.exports = server