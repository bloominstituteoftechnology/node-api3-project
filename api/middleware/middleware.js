const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      next({ status: 404, message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (name) {
    next();
  } else {
    next({ status: 400, message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (text) {
    next();
  } else {
    next({ status: 400, message: "missing required text field" });
  }
}

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: "something went really wrong!",
  });
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  handleError,
};
