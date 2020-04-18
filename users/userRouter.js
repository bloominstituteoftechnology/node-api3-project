const express = require("express");
const db = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser(), (req, res) => {
  // do your magic!
  const newUser = {
    name: req.body.name,
  };

  db.insert(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((user) => {
      res.status(500).json({
        message: "User could not be created",
      });
    });
});

router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
  // do your magic!
  const newPost = {
    text: req.body.text,
    user_id: req.params.id,
  };

  postDb
    .insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: "User's post could not be created",
      });
    });
});

router.get("/", (req, res) => {
  // do your magic!

  db.get(req.query)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: "This user information could not be found",
      });
    });
});

router.get("/:id", validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user);

  db.getById(req.params.id)
    .then((userId) => {
      res.status(200).json(userId);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id/posts", validateUserId(), (req, res) => {
  // do your magic!

  db.getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", validateUserId(), (req, res) => {
  // do your magic!

  db.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "User failed to be deleted",
      });
    });
});

router.put("/:id", validateUserId(), (req, res) => {
  // do your magic!

  db.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "User cannot be updated",
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    db.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: "User ID not found",
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  };
}

function validateUser(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Missing user data",
      });
    } else if (!req.body.name) {
      return res.status(400).json({
        errorMessage: "Missing user name",
      });
    } else {
      next();
    }
  };
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        errorMessage: "Missing post data",
      });
    } else if (!req.body.text) {
      return res.status(400).json({
        errorMessage: "Missing required text field",
      });
    } else {
      next();
    }
  };
}

module.exports = router;
