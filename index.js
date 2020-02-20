// code away!
const express = require('express');
const userRouter = require('./users/userRouter')
const server = express();
const logger = require('./middleware/logger');
const port = 8000;
// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });
server.use('/',userRouter)
//custom middleware
server.use(logger())

server.listen(port,()=>{
  console.log('Server is running')

})
server.use((err,req,res,next)=>{
   console.log(err)
   res.status(500).json({errorMessage: "oops something went wrong"})
})

module.exports = server;