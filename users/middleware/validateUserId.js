const { getById } = require("../userDb.js");

module.exports = function(req, res, next) {
  const id = req.params.id;
  getById(id)
    .then(users => {
      if (!users) res.status(400).json({ message: "invalid user id" });
      else next();
    })
    .catch(err =>
      res.status(500).json({
        message: "error in validating user id",
        error: err,
        error_message: err.message
      })
    );
};
