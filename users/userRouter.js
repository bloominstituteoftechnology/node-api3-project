const express = require("express");

const router = express.Router();

const db = require("./userDb");

const postdb = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errormessage: "error getting data" });
    });
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  let id = req.params.id;
  let post = {
    text: req.body.text,
    user_id: id,
  };
  postdb
    .insert(post)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Could not retrieve data" });
    });
});

router.get("/", (req, res) => {
  db.get()
    .then((users) => {
      res.status(200).json({ users: users });
    })
    .catch((error) => {
      res.status(500).json({ message: "could not retrieve user data" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
        .end();
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id;
  db.getUserPosts(id)
    .then((response) => {
      res.status(200).json({ posts: response });
    })
    .catch((error) => {
      res.status(500).json({ message: "could not retrieve post data" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  id = req.params.id;
  db.remove(id)
    .then((response) => {
      res.status(200).json(`succesfully deleted user ${id}`);
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not retrieve data" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  let post = {
    name: req.body.name,
  };
  db.update(id, post)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The post information could not be modified" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  id = req.params.id;
  var userIds = [];
  db.get().then((response) => {
    response.map((user) => {
      userIds.push(Number(user.id));
    });
    if (!userIds.includes(Number(id))) {
      res.status(404).json({ message: "user with this id does not exist" });
    } else {
      next();
    }
  });
}

function validateUser(req, res, next) {
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required text field" }).end();
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" }).end();
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" }).end();
  } else {
    next();
  }
}

module.exports = router;
