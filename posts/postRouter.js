const express = require('express');
const Hubs = require('./postDb')

const router = express.Router();

function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params
  
  Hubs
    .getById(id)
    .then(data => {
      console.log(data)
      if (data) {
        req.hub = data
        next()
      } else {
        // next({code: 400, message: `ID ${id} does not exist at all`})
        res.status(404).json({message: `post ${id} does not exist at all`})
        console.log({message: `post ${id} does not exist at all`})
      }
    })
    .catch(error => {
      console.log(error.message, error.stack)
      res.status(500).json({
          message: error.message,
          stack: error.stack
      })
  })
}

router.get('/', (req, res) => {
  // do your magic!
  Hubs
    .get(req.query)
    .then(hubs => {
      res.status(200).json(hubs)
    })
    .catch(error => {
      console.log(error.message, error.stack)
      res.status(500).json({
          message: error.message,
          stack: error.stack
      })
  })
});

router.get('/:id', [validatePostId], (req, res) => {
  // do your magic!
  // Hubs
  //   .getById(req.params.id)
  //   .then(hubs => {
  //     if(hubs){
        res.status(202).json(req.hub)
  //     } else {
  //       res.status(404).json({message: `post with ID ${req.params.id} doesnt exist!`})
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error.message, error.stack)
  //     res.status(500).json({
  //         message: error.message,
  //         stack: error.stack
  //     })
  // })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Hubs
    .remove(req.params.id)
    .then(count => {
      if (count >0) {
        res.status(200).json({message: ` post ${req.params.id} has been deleted`})
      } else {
        res.status(404).json({ message: `post with ID ${req.params.id} cannot be found`})
      }
    })
    .catch(error => {
      console.log(error.message, error.stack)
      res.status(500).json({
          message: error.message,
          stack: error.stack
      })
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const changes = req.body

  Hubs
    .update(req.params.id, changes)
    .then(hub => {
      if(hub){
        const changePost = {id: req.params.id, ...changes}
      res.status(202).json(changePost)
      } else {
        res.status(400).json({message: `post with ID ${req.params.id} does not exist`})
      }
    })
    .catch(error => {
      console.log(error.message, error.stack)
      res.status(500).json({
          message: error.message,
          stack: error.stack
      })
  })
});

// custom middleware



module.exports = router;
