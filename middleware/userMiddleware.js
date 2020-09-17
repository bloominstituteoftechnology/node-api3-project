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
          req.id = user.id;
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
