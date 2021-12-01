const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next()
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(possibleUser => {
      if (possibleUser) {
        req.user = possibleUser;
        next();
      } else {
        res.status(404).json({ message: 'user not found'});
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  if (
    !req.body.name ||
    typeof req.body.name !== 'string' ||
    !req.body.name.trim()
  ) {
    res.status(400).json({ message: 'missing required name field'});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (
    !req.body.text
  ) {
    res.status(400).json({ message: 'missing required text field'});
  } else {
    next();
  }
}


module.exports = { logger, validateUserId, validateUser, validatePost };