const users = require("../users/userDb");

module.exports = () => {
  return async (req, res, next) => {
    //validates the user id on every request that expects a user id parameter
    try {
      const user = await users.getById(req.params.id);
      if (user) {
        //if the `id` parameter is valid, store that user object as `req.user`
        req.user = user;
        next();
      } else {
        //if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400`
        res.status(400).json({ message: "invalid user id" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error updating user",
      });
    }
  };
};
