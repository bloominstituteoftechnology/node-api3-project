const express = require("express");

const db = require("../users/userDb.js");
const postDb = require("../posts/postDb.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;

  db.insert(newUser)
    .then(brandNewUser => {
    res.status(200).json(brandNewUser)
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving to the database"
      });
    });
});

router.post("/:id/posts", validatePost, (req, res) => {
  // do your magic!
  const newBody = req.body;
  // db.insert(newBody)
  const user_id = req.params.id;
  const newPost = {text: newBody.text, user_id}
  postDb.insert(newPost)
  .then(brandNewPost => {
    res.status(200).json({ newPost })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      errorMessage: "There was an error while saving the post to the database"
    });
  });
});

router.get("/", (req, res) => {
  // do your magic!
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The users information could not be found"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  const userId = req.params.id;

  db.getById(userId)
    .then(specificUser => {
      if (specificUser) {
        res.status(200).json(specificUser)
      } else {
        res.status(500).json({
          error: "No user with that ID"
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The user information could not be retrieved"
      });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  const postId = req.params.id;

  db
    .getUserPosts(postId)
    .then(specificPost => {
      if (postId) {
        res.status(200).json(specificPost);
      } else {
        res.status(404).json({
          message: "The post with the specific ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post information could not be retrieved"
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const delId = req.params.id;

  db.remove(delId)
    .then(deletedUser => {
      if (!delId) {
        res.status(404).json({
          message: "The user with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ deletedUser });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const usersId = req.params.id;
  const userBody = req.body;

  db.update(usersId, userBody)
    .then(updatedUser => {
      if (!usersId) {
        res.status(404).json({
          message: "The user with the specific ID does not exist"
        });
      } else {
        res.status(200).json({ updatedUser });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The user information could not be modified"
      });
    });
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
//   const userId = Number(req.params.id)
//   if (typeof userId === "number") {
//     next()
//   } else {
//     res.status(404).json({
//       message: "The user with the specific ID does not exist"
//     });
//   }
// }

// function validateUser(req, res, next) {
//   // do your magic!
//   if (!req.body) {
//     res.status(400).json({
//       message: "missing user data"
//     });
//   } else if (!req.body.name) {
//     res.status(400).json({
//       message: "missing required name field"
//     });
//   } else {
//     next()
//   }
// }

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) { 
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next()
  }
}

module.exports = router;
