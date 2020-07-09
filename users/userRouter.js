const express = require("express");
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the user",
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Posts.insert(req.post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the post",
      });
    });
});

router.get("/", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the users",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(req.user);
        // res
        //   .status(200)
        //   .json({
        //     message: `The user whith ${req.params.id} id has been deleted`,
        //   });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.user.id, req.body)
    .then((count) => {
      // count ?
      // Users.getById(req.user.id)
      // .then((user) => {
      //   res.status(200).json(user);
      // })
      // .catch((err) => {
      //   req
      //     .status(500)
      //     .json({ message: "An error occured during getting user" });
      // })
      // :
      // res.status(404).json({ message: "The user could not be found" })
      //----------------------------------
      if (count) {
        Users.getById(req.user.id)
          .then((user) => {
            res.status(200).json(user);
          })
          .catch((err) => {
            req
              .status(500)
              .json({ message: "An error occured during getting user" });
          });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the user",
      });
    });
});

//custom middleware
function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

function validateUser(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  if (!isEmpty(req.body)) {
    if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      req.post = {
        ...req.body,
        user_id: req.user.id,
      };
      next();
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = router;
