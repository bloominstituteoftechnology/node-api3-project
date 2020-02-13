const express = require("express");
const Db = require("./userDb");
const postDb = require("../posts/postDb");
const router = express.Router();

router.use(express.json());

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Db.insert(req.body)
    .then(user => {
      res.status(200).json(req.body);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Error with adding user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  console.log("IN POSTING POST", req.post);
  req.post.user_id = req.params.id;
  postDb
    .insert(req.post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Error adding post" });
    }); // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  Db.get()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "It no worky" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Db.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Db.remove(req.params.id)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Could notremvoe user" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  Db.update(id, body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "USer could not be Updated" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Db.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ Error: "No user with that ID found" });
      }
    })
    .catch(err => {
      console.log(err);
    });

  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;
  if (body && body.name) {
    next();
  } else {
    if (body) {
      res.status(500).json({ Error: "Needs to have a name field" });
    } else {
      res.status(500).json({ Error: "Needs to have a body" });
    }
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;

  if (body && body.text) {
    req.post = body;
    next();
  } else {
    if (body) {
      res.status(400).json({ Error: "Needs to have text" });
    } else {
      res.status(400).json({ message: "missing post data" });
    }
  }
}

module.exports = router;
