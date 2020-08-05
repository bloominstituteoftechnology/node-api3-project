const validateUser = (req, res, next) => {
  if (req.body) {
    next();
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    res.status(400).json({ message: "missing user data" });
  }
};

module.exports = validateUser;
