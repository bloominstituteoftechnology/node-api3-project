const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: 'user not found',
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: 'problem finding user',
    });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
