const express = require('express')
const server = express()

const postRouter = require('./posts/postRouter')
const { post } = require('./server')

server.use(express.json())



server.get('/', (req,res)=>{
    res.send(`<h1> Server is up and running </h1>`)
})

server.use('/api/users', postRouter)







server.listen(8003, () => {
    console.log('\n* Server Running on http://localhost:8003 *\n');
  });