const validatePost = (req, res, next) => {
  if (req.body) {
    next();
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing post data" });
  } else {
    res.status(400).json({ message: "missing required text field" });
  }
};

module.exports = validatePost;
