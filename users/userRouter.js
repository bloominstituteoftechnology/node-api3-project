const express = require("express");
const userData = require("./userDb");
const postData = require("../posts/postDb")
const router = express.Router();

router.use(express.json());

//custom middleware

function validateUserId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
  // do your magic!
}

function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else if (req.body === null) {
    res.status(400).json({ message: "missing user data" });
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
  // do your magic!
}

function validatePost(req, res, next) {
  if (req.body.text && req.body.user_id) {
    next();
  } else if ((req.body = null)) {
    res.status(404).json({ message: "missing post data" });
  } else {
    res.status(404).json({ message: "missing required text field" });
  }
  // do your magic!
}

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;
  userData
    .insert(newUser)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Server could not add user!" });
    });
  // do your magic!
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  let postdata = req.body
  console.log(postdata)
  postData
    .insert(postdata)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: "Failed to add post" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  userData
    .get(req)
    .then((resp) => {
      res.status(200).json({ data: resp });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ ErrorMessage: "Server could not get users!" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  userData
    .getById(req.params.id)
    .then((resp) => {
      if (resp) {
        res.status(200).json(resp);
      } else {
        res
          .status(404)
          .json({ ErrorMessage: "User With This Id Does Not Exist!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ ErrorMessage: "Server could not find user with this id" });
    });
  // do your magic!
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userData
    .getUserPosts(req.params.id)
    .then((resp) => {
      if (resp) {
        res.status(200).json(resp);
      } else {
        res.status(404).json({ ErrorMessage: "User has no posts!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        ErrorMessage: "Server could not find users posts with this id",
      });
    });
  // do your magic!
});

router.delete("/:id", validateUserId, (req, res) => {
  userData
    .remove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "The user has been removed" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ ErrorMessage: "User Could not be found and deleted" });
    });
});

// do your magic!

router.put("/:id", validateUserId, (req, res) => {
  const updateUser = req.body;
  userData.update(req.params.id, updateUser).then((resp) => {
    res.status(201).json(resp);
  });
  // do your magic!
});

module.exports = router;
