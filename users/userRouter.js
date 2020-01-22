const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();
router.use("/:id", validateUserId);

router.post("/", validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(`${user.name} has been created`);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding user" });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  // do your magic!
  const { id } = req.user;

  console.log("id: ", id);
  console.log("user: ", req.user.name);
  console.log("post text: ", req.body);

  const newPost = req.body;
  // newPost.postedBy = req.user.name;
  newPost.user_id = req.user.id;

  postDb
    .insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "error creating post" });
    });
});

router.get("/", (req, res) => {
  userDb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving the users" });
    });
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.user);

  // userDb
  //   .getById(req.params.id)
  //   .then(user => {
  //     if (!user) {
  //       res.status(404).json({ message: "User with given Id does not exists" });
  //     } else {
  //       res.status(200).json(user);
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).json({ message: "Error Retrieving the User" });
  //   });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.user;

  userDb
    .getUserPosts(id)
    .then(userPost => {
      res.status(200).json(userPost);
    })
    .catch(error => {
      res.status(500).json({ message: "Error Retrieving User Posts" });
    });

  // userDb
  //   .getUserPosts(req.params.id)
  //   .then(userPost => {
  //     if (userPost.length === 0) {
  //       console.log("mad it here");
  //       res
  //         .status(404)
  //         .json({ message: "no posts available with provide user id" });
  //     } else {
  //       res.status(200).json(userPost);
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).json({ message: "Error Retrieving User Posts" });
  //   });
});

router.delete("/:id", (req, res) => {
  const { id } = req.user;
  userDb
    .remove(id)
    .then(user => {
      res.status(200).json(`The user has been deleted`);
    })
    .catch(error => {
      res.status(500).json({ message: "Error Deleting User" });
    });

  // userDb
  //   .remove(req.params.id)
  //   .then(user => {
  //     if (user <= 0) {
  //       req.status(404).json({ message: "no user with specified id exists" });
  //     } else {
  //       res.status(200).json(`The user has been deleted`);
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).json({ message: "Error Deleting User" });
  //   });
});

router.put("/:id", (req, res) => {
  const { id } = req.user;

  userDb
    .update(id, req.body)
    .then(user => {
      res.status(200).json(`${user} user has been updated`);
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the user" });
    });

  // userDb
  //   .update(req.params.id, req.body)
  //   .then(user => {
  //     if (user) {
  //       res.status(200).json(user);
  //     } else {
  //       res.status(404).json({ message: "user can not be found" });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "error updating the user" });
  //   });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "exception", err });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
