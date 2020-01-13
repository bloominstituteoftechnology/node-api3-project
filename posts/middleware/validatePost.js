module.exports = function(req, res, next) {
  const body = req.body;

  switch (true) {
    case !body:
      return res.status(400).json({ message: "missing post data" });
    case !body.text:
      return res.status(400).json({ message: "missing required text field" });
    default:
      return next();
  }
};
