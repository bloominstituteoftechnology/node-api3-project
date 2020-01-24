const express = require("express");
const db = require("./userDb");
const router = express.Router();
const Posts = require("../posts/postDb");

router.post("/", validateUser(), (req, res) => {
  // do your magic!
  db.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving data", err });
    });
});

router.post("/:id/posts", validateUserId, validatePost(), (req, res) => {
  // do your magic!
  // const messageInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(req.text)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ Error: "failed", err });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  db.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve users", err });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "Error getting posts", err });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user with that ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "could not delete user", err });
    });
});

router.put("/:id", validateUserId, validateUser(), (req, res) => {
  // do your magic!
  db.update(req.params.id, req.user)
    .then(use => res.json(use))
    .catch(err => {
      res.status(500).json({ error: "failed to retrieve data", err });
    });
});

// //custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  db.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "ID does not exist, val" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "validator not working", err });
    });
}

function validateUser() {
  return (req, res, next) => {
    resource = {
      name: req.body.name
    };
    if (!req.body.name) {
      return res.status(404).json({ message: "could not retrieve user" });
    } else {
      req.user = resource;
      next();
    }
  };
}

function validatePost() {
  return (req, res, next) => {
    resource = {
      text: req.body.text,
      user_id: req.params.id
    };
    if (!req.body.text) {
      return res.status(404).json({ error: "could not retrive post" });
    } else {
      req.text = resource;
      next();
    }
  };
}

module.exports = router;
