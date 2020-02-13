const express = require('express');

const database = require('./postDb')
const {validatePost} = require('../users/userRouter')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  database.get()
          .then(posts => {
            res.status(200).json(posts)
          }).catch(err => res.status(500).json({error: "Could not get posts."}))
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  database.remove(req.params.id)
          .then(post => {

            res.status(200).json(post);
          }).catch(err => res.status(500).json({error: "Could not get posts."}))

});

router.put('/:id', validatePostId,(req, res) => {
  // do your magic!
  const newPost = {...req.post, text: req.body.text}
  database.update(req.params.id, newPost)
          .then(post => {
            res.status(200).json(post);
          }).catch(err => res.status(500).json({error: "Could not get posts."}))

});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  database.getById(req.params.id)
          .then(posts => {

            if(!posts){
              res.status(400).json({error: "Invalid post ID"})
            }else{

              req.post = posts;
              next();
            }
            
          }).catch(err => res.status(500).json({error: "Could not get posts."}))

  
}

module.exports = router;
