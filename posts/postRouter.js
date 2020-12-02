const express = require('express');

const router = express.Router();
const Post =  require('./postDb')

router.get('/', (req, res) => {
  Post.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.message})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  const { id } = req.params
  Post.getById(id)
  .then(post =>  {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: err.message})
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Post.remove(id)
    .then(post => {
      res.status(200).json({ message :  'post deleted'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error : err.message })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  Post.update(id, changes)
    .then(post => {
      res.status(201).json(changes)
    })
    .catch(err  => {
      console.log(err)
      res.status(500).json({ error : err.message })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } =  req.params
  Post.getById(id)
  .then(postId => {
    if(postId){
      req.id = id
      next()
    }
    else{
      res.status(404).json({ message: `post with id ${id} not found`})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
  
}

module.exports = router;
