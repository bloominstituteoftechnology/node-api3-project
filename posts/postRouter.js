const express = require("express");
const postsData = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  postsData
    .get(req)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      res.status(500).json({ Message: "server failed to get posts" });
    });
  // do your magic!
});

router.get("/:id", (req, res) => {
  postsData
    .getById(req.params.id)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      res.status(500).json({ Message: "Can not find post with this ID" });
    });
  // do your magic!
});

router.delete("/:id", (req, res) => {
  postsData
    .remove(req.params.id)
    .then((resp) => {
      if (resp) {
        res.status(200).json({ Message: "Post has been removed!" });
      } else {
        res.status(404).json({ Message: "Post can not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Server could not find this message" });
    });
  // do your magic!
});

router.put("/:id", (req, res) => {
  const changes = req.body
  console.log(req.body)
  postsData
    .update(req.params.id, changes)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ Message: "Post could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Server could not find this post" });
    });
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
