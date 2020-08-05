const userDB = require("../users/userDb");

const validateUserId = (req, res, next) => {
  userDB
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user id." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = validateUserId;
