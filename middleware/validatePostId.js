const postDB = require("../posts/postDb");

const validatePostId = (req, res, next) => {
  postDB
    .getById(req.params.id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "Invalid post id." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = validatePostId;
