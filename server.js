const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();
 server.use(express.json());

server.use(logger)
// server.use(validateUserId);
server.use('/api/users', userRouter);
server.use('/api/users/:id/posts', postRouter);
 server.use(atGate);
 
server.get('/',logger , (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get('/mellon', auth, (req,res)=> {
  console.log('Gate opening...');
  console.log('Inside')
  console.log('Welcome traverler')
})

//custom middleware


function atGate(req,res, next){
  console.log('At the Gate , about to be eaten');
  next();
}

function auth (req, res, next){
  if (req.url === '/mellon'){
    next();
  }else {
    res.send('You shall not pass!');
  }
}
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
}

module.exports = server;
