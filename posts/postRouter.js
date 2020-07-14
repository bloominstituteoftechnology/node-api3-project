const express = require('express');
const Posts = require('./postDb');
const mid = require("../midWare");
const router = express.Router();

router.use((req, res, next) => {
  console.log("in posts");
  next();
});

router.get('/', (req, res) => {
  // do your magic!
   Posts.get(req.query)
    
     .then( posts => {
       res.status(200).json(posts);
     })
     .catch((error) => {
       // log error to server
       console.log(error);
       res.status(500).json({
         message: "Error retrieving the body",
       });
     });
});

router.get('/:id',mid.validatePostId, (req, res) => {
  // do your magic!
    Posts.getById(req.params.id)
      .then((posts) => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch((error) => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the post",
        });
      });
});

router.delete('/:id', mid.validatePostId, (req, res) => {
  // do your magic!
     Posts.getById(req.params.id)
       .then(async (byePost) => {
         await Posts.remove(req.params.id);
         res.status(200).json(byePost);
       })
       .catch((error) => {
         // log error to database
         console.log(error);
         res.status(500).json({
           message: "Error removing post",
         });
       });
});

router.put('/:id',mid.validatePostId, mid.validatePost, (req, res) => {
  // do your magic!
     Posts.update(req.params.id, {
       text: req.body.text,
     })
       .then((update) => {
         res.status(200).json(update);
       })
       .catch((error) => {
         // log error to database
         console.log(error);
         res.status(500).json({
           message: "Error editing post",
         });
       });
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
