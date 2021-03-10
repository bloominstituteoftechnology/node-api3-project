const Post = require("../posts/posts-model");
const Users = require("../users/users-model");

function logger(req, res, next) {
  // do your magic!
  console.log(
    ` METHOD: ${req.method} URL: ${req.url} TIMESTAMP: ${Date.now()}`
  );
  next();
}

const validateUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Post.getById(id);
    if (!user) {
      res.status(404).json({ message: `ID ${id} found.` });
    } else {
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(500).json({ message: `${e}` });
  }
};

const validateUser = async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (!user) {
      res.status(400).json({ message: `ID ${id} found.` });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ message: `${e}` });
  }
};

function validatePost(req, res, next) {
  // do your magic!
  const { name, text, postedBy } = req.body;
  if (!name || !text || !postedBy) {
    res.status(404).json({ message: "You have to add a name to post!" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
