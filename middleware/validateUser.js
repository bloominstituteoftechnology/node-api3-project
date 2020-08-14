const users = require("../users/userDb");

module.exports = (req, res, next) => {
  //validates the `body` on a request to create a new user
  !req.body //if the request `body` is missing, cancel the request and respond with status `400
    ? res.status(400).json({ message: "missing user data" })
    : !req.body.name //if the request `body` is missing the required `name` field, cancel the request and respond with status `400`
    ? res.status(400).json({
        message: "missing required name field",
      })
    : next();
};
