const postsModel = require('../posts/posts-model');
const usersModel = require('../users/users-model');

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} at ${req.get('Origin')}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  usersModel.getById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found.'});
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Server side error.'});
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'Missing user data.' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Missing required name field.' });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  postsModel.getById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: 'Post not found.' });
      } else {
        req.post = post;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Sever side error.' });
    });
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'Missing post data.'});
  } else if (!req.body.text) {
    res.status(400).json({ message: 'Missing required text field. '});
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePostId, validatePost}