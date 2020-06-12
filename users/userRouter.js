const express = require("express");

const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();
router.use(express.json());

//--------------------------
// add user
//--------------------------

router.post("/", validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not post user data" });
    });
});

//--------------------------
// POST posts by userID
//--------------------------

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  postDb
    .insert({ ...req.body, user_id: req.params.id })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not post data." });
    });
});

//--------------------------
// GET Users
//--------------------------

router.get("/", (req, res) => {
  userDb.get(req.body).then((users) => {
    res.status(200).json(users);
  });
});

//--------------------------
// GET user By ID
//--------------------------

router.get("/users/:id", validateUserId, (req, res) => {
  userDb
    .getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not retrieve specified ID" });
    });
});

//--------------------------
// GET posts by user ID
//--------------------------

router.get("/:id/posts", (req, res, next) => {
  userDb
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
        res.status(500).json({
        message: "Could not get user posts",
      });
    });
  next();
});

//--------------------------
// DELETE User
//--------------------------

router.delete("/:id", (req, res, next) => {
  userDb.remove(req.params.id).then((count) => {
    if (count > 0) {
      res.status(200).json({
        message: "The User has been NUKED",
      });
    } else {
      res.status(404).json({
        message: "The user couldn't be found",
      });
    }
  });
  next();
});

//--------------------------
// UPDATE user
//--------------------------

router.put("/:id", (req, res) => {
  userDb.update(req.params.id, req.body).then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "The user couldn't be found",
      });
    }
  });
});

//--------------------------
//custom middleware
//--------------------------

function validateUserId(req, res, next) {
  userDb.getById(req.params.id).then((user) => {
    if (!user) {
      res.status(404).json({ error: "The specified ID does not exist." });
    } else {
      next();
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data." });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field.",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  postDb.getById(req.params.id).then((post) => {
    if (!post) {
      res.status(404).json({
        error: "The specified post does not exist.",
      });
    } else {
      next();
    }
  });
}
module.exports = router;
