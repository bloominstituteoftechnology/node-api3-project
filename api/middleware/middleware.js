const Users = require("../users/users-model.js");
const Posts = require("../posts/posts-model.js");

const logger = (req, res, next) => {
  const reqTime = new Date().toLocaleString();

  console.log(`
-- Request made on: ${reqTime}
-- Request made by: ${req.ip}
-- Request made at: endpoint ${req.originalUrl}
-- Request made with: ${req.method} method
  `);
  next();
};

const validateUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      console.log(`\n userId validated \n`);
      next();
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const validateUser = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    console.log(`\n new user "${req.body.name}" is valid \n`);
    next();
  }
};

const validatePost = (req, res, next) => {
  try {
    const userPost = req.body;
    if (!userPost.text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      console.log(`\n user "${req.body.name}" new post valid \n`);
      next();
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
