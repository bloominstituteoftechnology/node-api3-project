const express = require("express");
const data = require("./userDb");
const { getUserPosts } = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  data
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.params.id;
  data
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/", (req, res) => {
  data
    .get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  data
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  data
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  data
    .remove(req.params.id)
    .then((user) => {
      res.status(200).json({ message: "User has been removed" });
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", validateUserId, (req, res) => {
  data
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

//custom middleware

function validateUserId(req, res, next) {
  data
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "There was a problem pulling data from server" });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing user data" });
  } else {
    if (!req.body.name) {
      return res.status(400).json({ message: "missing required name" });
    }
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "missing post data" });
  } else {
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text" });
    }
  }
}

module.exports = router;
