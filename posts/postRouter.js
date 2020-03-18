const express = require("express");
const postDb = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  postDb
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "Sorry there was an error" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  postDb
    .getById(id)
    .then(item => {
      if (item) {
        res.status(200).json({ item });
      } else {
        res.status(404).json({
          error: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post could not be found by that id"
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  postDb
    .remove(id)
    .then(item => {
      if (item) {
        res.status(200).json({ message: `You deleted post ${id}` });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const postInfo = req.body;
  console.log(postInfo);
  postDb
    .update(id, postInfo)
    .then(item => {
      if (item) {
        res.status(200).json({ item });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be modified" })
    );
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  // do your magic!
  postDb
    .getById(id)
    .then(postId => {
      if (postId) {
        req.postId = postId;
        next();
      } else {
        res.status(500).json({ message: "failed" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed" });
    });
}

module.exports = router;
