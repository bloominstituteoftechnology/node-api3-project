const express = require("express");

const router = express.Router();
const Posts = require("./postDb");
const Users = require('../users/userDb')
// const router = express.Router();

router.get("/",validatePostId,  (req, res) => {
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

router.get("/:id", validatePostId,(req, res) => {
  // do your magic!
  Posts.getById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post found" });
    }
  });
});

router.delete("/:id", validatePostId,(req, res) => {
  // do your magic!
  Posts.remove(req.params.id).then(count => {
    if (count > 0) {
      res.status(200).json({ message: "The post has been nuked!" });
    } else {
      res.status(500).json({ message: "error in deleting" });
    }
  });
});

router.post('/', (req, res)=> {
   Posts.insert(req.body)
  .then(post => {
    if(post){
      res.status(201).json(post)
    }else{
      res.status(500).json({message: "error adding the Post!!"})
    }

  })
})

router.put("/:id",validatePostId, (req, res) => {
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

 async function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  const post = await Posts.getById(id);
  if(post){
    next();
  }else{
    res.status(404).json({message: 'Must have a valid Post Id, son'})
  }
}

 




module.exports = router;
