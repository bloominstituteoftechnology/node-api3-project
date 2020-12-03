const express = require('express');
const postsData = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  postsData
    .get(req)
    .then((res) => {
    res.status(200).json({data: res})
    })
    .catch((err) => {
    res.status(500).json({message: 'Oops, failed to retrieve posts!'})
  })
});

router.get('/:id', (req, res) => {
  postsData
    .getById(req.params.id)
    .then((res) => {
    res.status(200).json({data: res})
    })
    .catch((err) => {
    res.status(500).json({message: `Oops, can not locate post with this id ${id}`})
  })
});


router.delete('/:id', (req, res) => {
  postsData
    .remove(req.params.id)
    .then((res) => {
      if (res) {
        res.status(200).json({ Message: "Post removed!" });
      } else {
        res.status(404).json({ Message: "Post not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Sorry, message not found!" });
    });
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
});

// custom middleware

function validatePostId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).json({ message: "Invalid post id!" });
  }
}

module.exports = router;
