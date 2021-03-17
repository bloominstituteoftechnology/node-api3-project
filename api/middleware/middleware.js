const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`Method: ${req.method}, Url: http://${req.hostname}:5000${req.path}, Date and time: ${new Date()}`);
  next();
};

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params;

    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
};

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const user = req.body;

  if (!user) {
    res.status(400).json({ message: "missing user data"});
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    console.log(user);
    next();
  }
};

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const post = req.body;

  if (!post) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    console.log(post);
    next();
  }
};

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePost}; 