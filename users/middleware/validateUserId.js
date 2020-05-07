const Users = require("../userDb");

module.exports = function validateUserId(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: 'invalid user id' });
  }

  Users
  .getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        message: "invalid user"
      });
    }
  })
}
