const express = require("express");
const posts = require("./postDb");
const router = express.Router();

router.get("/posts", (req, res) => {
  // do your magic!
  posts
    .get()

    .then((post) => {
      res.status(200).json(post);
    });
});

router.get("/posts/:id", validatePostId, (req, res) => {
 

  res.status(200).json(req.post);
});

router.delete("/posts/:id", validatePostId, (req, res) => {
  // do your magic!
  posts.remove(req.params.id).then((post) => {
    res.status(200).json(post);
  });
});

router.put("/posts/:id", validatePostId, (req, res) => {
  // do your magic!
  
  posts.update(req.params.id , req.body)
  .then((post) =>{
    if(!req.body){
      res.status(400).json({
        message: "Missing user name or email",
    })
    }else{
      res.status(200).json(post)
    }
  })
});

// custom middleware

function validatePostId(req,res,next) {
  // do your magic!
  
    posts
      .getById(req.params.id)
      .then((post) => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(404).json({
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the user",
        });
      });
  
}



module.exports = router;
