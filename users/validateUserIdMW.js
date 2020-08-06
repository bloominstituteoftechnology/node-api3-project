const Users = require("./userDb");

module.exports = (req, res, next) => {
  let requestedUser = req.params.id;

  Users.getById(requestedUser)
    .then((response) => {
      if (!response) {
        return res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = response;
        next();
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
