const User = require("../../users/userDb");

function validateUserId(req, res, next) {
  const { id } = req.params;
  if (!id)
  User.getById({ id })
    .then(userID => {
      if (!userID) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "beep beep boop?"
      });
    });

  next();
}

module.exports = validateUserId;
