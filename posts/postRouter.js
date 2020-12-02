const express = require('express');
const Posts = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  const{query} = req

  Posts.get(query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  const {id} = req.params

  Posts.getById(id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params

  Posts.remove(id)
  .then(del => {
    res.status(200).json({message:'wow that was mean :O'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  const {id} = req.params
  const changes = req.body

  Posts.update(id, changes)
  .then(post => {
    res.status(200).json(changes)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })

});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  users.getById(id)
  .then(postID => {
    if(postID){
      req.id = id;
      next();
    } else{
      res.status(404).json({ message: `post with id ${id} not found` })
    }
    
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
}

module.exports = router;
