// const { getById } = require("../routers/userDb");
// - - validateUserId(): validates the 'user id' upon every api request that expects a user id parameter. If the user id parameter is valid store the user object as req.user and it will be passed down the queue. If the id paramter does not match any user id in the database, cancel the request and respond with status 400 and a "{ message: "invalid user id" }"
// - - - DPH's: getById() from -> "users/userDb.js".
const users = require("../routers/userDb");

const validateUserId = () => {
  return (req, res, next) => {
    // Define the data and operations I will need to validate the incoming user :id
    const id = req.params.id;
    const getUserId = users.getById(id);
    // const getIds = users.getAllUserIds();

    // Now I need to figure if the user exist based on the specified ID, and it it does exist I will queue it down to the response in the userRouter
    getUserId
      .then((user) => {
        if (user) {
          console.log("I am the user:", user);
          req.user = user;
          next();
        } else {
          return res.status(404).json({
            message: `Seems user with id:${id} dosen't exist`,
          });
        }
      })
      .catch((err) => {
        next();
      });
  };
};

module.exports = {
  validateUserId,
};
