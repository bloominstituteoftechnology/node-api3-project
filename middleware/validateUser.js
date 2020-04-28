const users = require("../users/userDb");

module.exports = () => {
  return (req, res, next) => {
    !req.body
      ? res.status(400).json({ message: "missing user data" })
      : !req.body.name
      ? res.status(400).json({ message: "missing required name field" })
      : req.body;

    next();
  };
};
