const posts = require("../posts/postDb");

module.exports = () => {
  return (req, res, next) => {
    !req.body
      ? res.status(400).json({ message: "missing post data" })
      : !req.body.text
      ? res.status(400).json({ message: "missing required text field" })
      : req.body;

    next();
  };
};
