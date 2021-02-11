const express = require("express");
const Users = require("./users-model");
const mw = require("../middleware/middleware");

const router = express.Router();

router.get("/", mw.logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", mw.validateUser, mw.logger, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/", mw.validatePost, mw.logger, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const name = req.body;
  Users.insert(name)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.put(
  "/:id",
  mw.validateUser,
  mw.validatePost,
  mw.logger,
  (req, res, next) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    Users.update(req.params.id, req.body)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: `${user} not found` });
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.delete("/:id", mw.validateUser, mw.logger, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/posts", mw.validateUser, mw.logger, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/:id/posts",
  mw.validateUser,
  mw.validatePost,
  mw.logger,
  (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const { text, postedBy } = req.body;
    Users.post(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        next(err);
      });
  }
);
router.use((err, req, res) => {
  res.status(500).json({
    message: " Users server error!!!",
    error: err.message,
  });
});

// do not forget to export the router
module.exports = router;
