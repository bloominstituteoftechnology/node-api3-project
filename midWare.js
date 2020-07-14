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

  validateId: function (req, res, next) {
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

  requireBody: function (req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
      next();
    } else {
      res.status(400).json({ message: " please include a body" });
    }
  },
  addName: function (req, res, next) {
    req.name = req.name || req.headers["x-name"];
    console.log(`${req.name} has been applied `);
    next();
  },
};