require('dotenv').config();

const express = require('express')
const server = express()

const postRouter = require('./posts/postRouter')
const { post } = require('./server')

const userRouter = require('./users/userRouter')

server.use(express.json())

const port = process.env.PORT;

server.get('/', (req,res)=>{
    res.send(`<h1> Server is up and running </h1>`)
})

server.use('/api/posts', postRouter)
server.use('/api/users' , userRouter)







server.listen(port, () => {
    console.log('\n* Server Running on http://localhost:8003 *\n');
  });