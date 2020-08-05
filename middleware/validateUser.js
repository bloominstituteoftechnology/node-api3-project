const userDB = require("../users/userDb");

const validateUser = (req, res, next) => {
  userDB
    .insert(req.body)
    .then((user) => {
      if (req.body.name) {
        res.status(201).json(user);
        next();
      } else if (!req.body.name) {
        res.status(400).json({ message: "missing required name field" });
      } else {
        res.status(400).json({ message: "missing user data" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = validateUser;
