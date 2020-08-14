const express = require("express");

const users = require("../users/userDb");

const router = express.Router();

router.post("/api/user", validateUser(), (req, res, next) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/api/user", (req, res) => {
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit
  };

  users
    .get(options)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/api/user/:id", validateUserId(), (req, res) => {
  res.status(200).json(req.user);
});

router.get(
  "/api/user/:id/posts",
  validateUserId(),
  validatePost(),
  (req, res, next) => {
    users
      .getUserPosts(req.params.id)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(next);
  }
);

router.delete("/api/user/:id", validateUserId(), (req, res, next) => {
  users
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been nuked"
        });
      } else {
        res.status(404).json({
          message: "The user could not be found"
        });
      }
    })
    .catch(next);
});

router.put(
  "/api/user/:id",
  validateUserId(),
  validateUserId(),
  (req, res, next) => {
    users
      .update(req.params.id, req.body)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(next);
  }
);

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({
            message: "invalid user id"
          });
        }
      })
      .catch(next);
  };
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body.id) {
      return res.status(400).json({
        message: "Missing username"
      });
    }

    next();
  };
}

function validatePost() {
  return (req, res, next) => {
    users
      .getUserPosts(req.params.id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(404).json({
            message: "User's post not found"
          });
        }
      })
      .catch(next);
  };
}

module.exports = router;
