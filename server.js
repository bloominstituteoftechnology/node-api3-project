const express = require('express');
const port = 5000
const server = express();

const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

server.use(logger())


server.use(express.json())
server.use(userRouter)
server.use(postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

//custom middleware

function logger(req, res, next) {
 
    return (req, res, next) =>{
      const time =  new Date().toISOString()
      console.log(`${time} ${req.ip} ${req.method} ${req.url}`)
    
      next()
    }
    }


module.exports = server;
