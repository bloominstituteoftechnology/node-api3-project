const db = require('../users/userDb')

module.exports = {
    validatePostId,
    validateUser,
    validatePost,
    validateUserId,
  };

function validatePostId(req, res, next) {
    const { id } = req.params;
  
    db.getById(id).then(post => {
      if (!post) {
        res.status(404).json({ message: "invalid post id" });
      } else {
        req.post = post;
        next();
      }
    });
  }

function validateUser(req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  }
  
  function validatePost(req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "missing post data" });
    } else if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
  }
  

function validateUserId(req, res, next) {
    const { id } = req.params;
  
    db.getById(id).then(user => {
      if (!user) {
        res.status(404).json({ message: "invalid user id" });
      } else {
        req.user = user;
        next();
      }
    });
  }