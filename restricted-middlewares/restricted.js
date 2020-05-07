module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const SECRET = process.env.SECRET;

  if (authorization === SECRET) {
    next();
  } else {
    res.status(403).json({ message: "not allow" });
  }
};
