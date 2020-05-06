// code away!
//const express = require('express')
const server = require('./server')
//const userRouter = require('./users/userRouter')
//server.use(express.json());
//server.use("/api/posts", postsRouter)


server.listen(8000, ()=> console.log('server is up'))