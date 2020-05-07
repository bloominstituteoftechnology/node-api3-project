// code away!
//const express = require('express')
const server = require('./server')
//const userRouter = require('./users/userRouter')
//server.use(express.json());
//server.use("/api/posts", postsRouter)

const port = (process.env.PORT || 8000)

server.listen(port, ()=> console.log('server is up'))