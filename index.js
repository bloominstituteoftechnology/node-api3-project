const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/users/posts', postRouter);

server.get('/', (req, res) =>
{
    res.json({message: 'api is working!!'});
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`));