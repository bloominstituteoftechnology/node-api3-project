/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
const Posts = require('../posts/postDb');
const Users = require('../users/userDb');

function logger(req, res, next) {
  console.log(`Method: ${req.method} 
  URL: ${req.originalUrl}`);
  next();
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: 'Invalid post ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Invalid post ID 500', err });
    });
}
function validateUserBody(req, res, next) {
  const { name } = req.body;
  Object.entries(req.body).length === 0
    ? res.status(400).json({ message: 'Missing user data' })
    : !name
      ? res.status(400).json({ message: 'Missing required name field' })
      : next();
}

function validatePostBody(req, res, next) {
  const { text } = req.body;
  Object.entries(req.body).length === 0
    ? res.status(400).json({ message: 'Missing post data' })
    : !text
      ? res.status(400).json({ message: 'Missing required text field' })
      : next();
}
function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'Invalid user ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Invalid user ID 500', err });
    });
}

module.exports = {
  logger,
  validatePostId,
  validatePostBody,
  validateUserId,
  validateUserBody,
};
