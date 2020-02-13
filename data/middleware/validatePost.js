const User = require("../../users/userDb")
const Post = require("../../posts/postDb")


function validatePosts(req, res, next) {
    

    const { body } = req;

  if (!body) {
    status(400).json({ message: "missing user data" });
  } else if (!body.text) {
    status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}


module.exports = validatePosts