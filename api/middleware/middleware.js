const Posts = require("../posts/posts-model");
const Users = require("../users/users-model");

function logger(req, res, next) {
  // console.log("HERES THE REQUEST", req);
  console.log("baseURL: ", req.baseUrl);
  console.log("method: ", req.method);
  console.log("date: ", Date());
  next();
  // do your magic!
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "user not found" });
      } else {
        req.user = user;
        next();
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error finding user" });
    });
}

function validateUser(req, res, next) {
  const user = req.body;
  if (!user) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "Missing required 'name' field" });
  } else {
    req.user = user;
    next();
  }
  // do your magic!
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: `Post with ID ${id} does not exist` });
      } else {
        req.post = post;
        next();
      }
    })
    .catch((error) => {
      res.status(500).json({ err: error, message: "Internal server error" });
    });
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
  const { text } = req.body;
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    req.validatedPost = req.body;
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost,
};
