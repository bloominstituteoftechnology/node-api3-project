const express = require("express");
const data = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  data
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: "there is a server issue" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  data
    .getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: `there is no id matching ${id}` });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  data
    .remove(id)
    .then((post) => {
      res.status(204).json(post);
    })
    .catch(() => {
      res.status(404).json({ error: `there is no id matching ${id}` });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const change = req.body;
  data
    .update(id, change)
    .then((one) => {
      if (one === 1) {
        res.status(200).json(one);
      } else {
        res.status(404).json({ message: "please provide the correct id" });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Server error" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  data.getById(req.params.id).then((post) => {
    if (post) {
      console.log("post", post);
      next();
    } else {
      res.status(400).json({ message: error.message });
    }
  });
}

module.exports = router;
