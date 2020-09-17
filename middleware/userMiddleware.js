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

const validatePostData = () => {
  return (req, res, next) => {
    // What data do I need to validate the post
    const text = req.body.text;
    req.upgradedPost = { ...req.body, user_id: Number(req.params.id) };

    if (!text) {
      console.log("I am text", text);
      return res.status(400).json({
        message: "Missing text on post",
      });
    } else {
      // console.log("I am the next thing", req.body.text);
      next();
    }
  };
};

const validateUserData = () => {
  return (req, res, next) => {
    // What do I need to do? In order to validate the user data?
    // - What user data needs to be validated
    // - - "name"

    const name = req.body.name;
    if (name.length === 0) {
      return res
        .status(400)
        .json({ message: "You need to submit a name for your user" });
    } else {
      console.log("I am the value of name", name);
      next();
    }
  };
};

module.exports = {
  validateUserId,
  validatePostData,
  validateUserData,
};
