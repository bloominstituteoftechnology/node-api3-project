const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "an error occurred" });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const post = await Posts.insert({ ...req.body, user_id: req.params.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "an error occurred" });
  }
});

router.get("/", async (req, res) => {
  const users = await Users.get();
  try {
    if (users.length) {
      res.status(200).json({ data: users });
    } else {
      res.status(404).json({ message: "Users could not be found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for users",
      error: error.message,
    });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.user.id);
    if (posts.length) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({
        message: `No posts could be found for user with id ${req.user.id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(count => {
      console.log(count);
      if (count > 0) {
        res.status(200).json({ message: "User has been removed" });
      } else {
        res
          .status(400)
          .json({ message: "User with specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  try {
    await Users.update(req.params.id, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "an error occurred" });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    req.user = user;
    if (user) {
      next();
    } else {
      next({ code: 404, message: `There is no user with id ${id}` });
    }
  } catch (error) {
    next({ code: 500, message: "There was a problem retrieving the user" });
  }
}

async function validateUser(req, res, next) {
  if (!req.body.name || typeof req.body.name !== "string") {
    next({ code: 400, message: "missing required name field" });
  } else {
    next();
  }
}

async function validatePost(req, res, next) {
  if (!req.body.text || typeof req.body.text !== "string") {
    next({ code: 400, message: "Please provide text as a string" });
  } else {
    next();
  }
}

module.exports = router;
