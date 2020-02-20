const express = require('express');

const server = express();
const logger = require('./middleware/logger');
const port = 8000;
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(logger())

server.listen(port,()=>{
  console.log('Server is running')

})


module.exports = server;
