const express = require("express");

const router = express.Router();
const Posts = require("./postDb");
// const router = express.Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });

  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
  Posts.getById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  Posts.remove(req.params.id).then(count => {
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked!" });
    } else {
      res.status(500).json({ message: "error in deleting" });
    }
  });
});

router.put("/:id", (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post could not be found" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the post."
      });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
