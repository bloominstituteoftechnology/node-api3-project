const Users = require("../userDb");

module.export = function validateUserId(req, res, next) {
  const { id } = req.params;
  Users
  .getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else if (!user) {
      res.status(404).json({
        message: "invalid user id"
      })
    }
  })
}
