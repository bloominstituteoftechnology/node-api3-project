module.exports = function(req, res, next) {
  const body = req.body;

  switch (true) {
    case !body:
      return res.status(400).json({ message: "missing user data" });
    case !body.name:
      return res.status(400).json({ message: "missing required name field" });
    default:
      return next();
  }
};
