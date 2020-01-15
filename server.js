const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./user/userRouter')
const server = express();
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware


function logger(req, res, next) {console.log(`${req.method} ${req.originalUrl} at ${new Date().toISOString()}`);
  next();
}
function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      }
      else {
        res.status(500).json({ message: "No user with this ID exists" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: "need to give an ID"})
    })
}

function validateUser(req, res, next) {

  if (req.body) {
    if (req.body.name) {
      next();
    }
    else {
      res.status(400).json({ message: "Missing name" })
    }
  } else {
    res.status(400).json({ message: "Missing user data" })
  }
}

function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "Missing required text field" });
    }
  } else {
    res.status(400).json({ message: "Missing post data" });
  }
}



server.use(logger);
server.use('./api/user', userRouter)
server.use('./api/post', postRouter)

module.exports = server,{validatePost, validateUser, validateUserId};
