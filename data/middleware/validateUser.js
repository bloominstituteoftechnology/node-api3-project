const User = require("../../users/userDb");

function validateUser(req, res, next) {
  const { body } = req;

  if (!body) {
    status(400).json({ message: "missing user data" });
  } else if (!body.name) {
    status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

module.exports = validateUser;
