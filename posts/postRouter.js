const express = require("express");
const posts = require("./postDb");

const router = express.Router();

router.get("/posts", (req, res) => {
  posts.get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
    })
});

router.get("/posts/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/posts/:id", validatePostId, (req, res) => {
  posts.remove(req.params.id).then((post) => {
    res.status(200).json(post);
  })
});

router.put("/posts/:id", validatePostId, (req, res) => {
  posts.update(req.params.id, req.params.body)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
    })
});

// custom middleware
function validatePostId(req, res, next) {
  posts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message:"The post with the specified ID does not exist."});
      }
    })
    .catch((error => {
      console.log(error);
      res.status(500).json({ errorMessage: "The post with the specified ID could not be retrieved."})
    }))
}

module.exports = router;
