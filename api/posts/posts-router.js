const express = require('express');
const Posts = require("./posts-model.js")
const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
  .then(posts => {
     res.status(200).json(posts);
    }
  )
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error:"The posts could not be retrieved."
    });
  });
});

router.delete('/:id', (req, res) => {
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post);
  })
  Posts.remove(req.params.id)
  .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed" 
      });
  
  });
});

router.put('/:id', (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(post => {
        res.status(200).json(post);
      }
  )
  .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
});

module.exports = router;
