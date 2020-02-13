const User = require("../../users/userDb");

function validateUserId(req, res, next) {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    res.status(400).json({ message: "Please provide a valid id" });
  } else {
    next();
  }
}

module.exports = validateUserId;
