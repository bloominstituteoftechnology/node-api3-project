const { getById } = require("../postDb.js");

module.exports = function(req, res, next) {
  const id = req.params.id;
  getById(id)
    .then(posts => {
      if (!posts) res.status(400).json({ message: "invalid post id" });
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
