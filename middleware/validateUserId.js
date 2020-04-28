const users = require("../users/userDb");

module.exports = () => {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: "User not found.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error updating the user",
        });
      });
  };
};
