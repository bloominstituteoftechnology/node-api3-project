function validateUserId(req, res, next) {
  const realId = req.headers.id;
  if (realId === id) {
    next();
  } else {
    res.status(401).json({errMessage: 'Invalid user'});
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).jsons({errMessage: 'The given name does not match'});
  }
  next();
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({errorMessage: 'Missing post data'});
  }
  if (!body.text) {
    res.status(400).json({errorMessage: 'Missing required text field'});
  }
  next();
}

module.exports = {
  validateUserId,
  validateUser,
  validatePost
};
