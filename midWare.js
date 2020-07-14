const Users = require('./users/userDb')

module.exports = {
  logger: function (req, res, next) {
    console.log(`${req.method} requests`);
    next();
  },

  methodLogger: function (req, res, next) {
    console.log(`${req.method} requests`);
    next();
  },

  validateUserId: function (req, res, next) {
    const { id } = req.params;
    Users.getById(id)
      .then((users) => {
        if (users) {
          req.users = users;
          next();
        } else {
          res.status(404).json({ message: "user id not found" });
        }
      })
      .catch((error) => {
        res.status(500).json({ messages: " error getting user" });
      });
  },

  validateUser: function (req, res, next) {
    if (Object.keys(req.body).length > 0) {
      next();
    } else {
      res.status(400).json({ message: " please include a body" });
    }
  },
  validatePost: function (req, res, next) {
    // do your magic!
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "missing post data",
      });
    } else if (req.body.text && req.body.text.length) {
      next();
    } else {
      res.status(400).json({
        message: "missing required text field",
      });
    }
  },

  addName: function (req, res, next) {
    req.name = req.name || req.headers["x-name"];
    console.log(`${req.name} has been applied `);
    next();
  },
};