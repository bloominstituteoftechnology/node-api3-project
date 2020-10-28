const express = require('express');
const postsData = require("./postDb");
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postsData.get()
  .then((posts) => {
    res.status(200).json(posts);
  })
  .catch((err)=> {
    next(err);
  })
});

router.get('/:id',  validatePostById, (req, res) => {
  const id = req.params.id
  postsData.getById(id)
  .then(posts => res.status(200).json(posts))
  .catch((err)=> {
    next(err);
  })
});

router.delete('/:id', validatePostById,  (req, res) => {
  const id = req.params.id
postsData
.remove(id)
.then((posts) => {
  res.status(200).json({posts})
})
.catch(error =>{
  console.log(error)
  res.status(500).json({message: "The post could not be removed"})
})
  // do your magic!
});

router.put('/:id', validatePostById, validatePost,(req, res) => {
  const id = req.params.id;
  const data = req.body;
    postsData.update(id, data)
      .then( posts => {
        res.status(201).json({posts})
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Post was not updated"})
      })
});

// custom middleware
function validatePost(req, res, next) {
  const data = req.body;
  if(!data){
    res.status(400).json({ message: 'missing post data.'})
} else if(!data.text){
    res.status(400).json({ message: "missing  required text field"})
} else { 
  next();
  }
}

function validatePostById(req, res, next) {
  const id = req.params.id;
postsData.getById(id)
  .then(posts => {
    if(!posts) {
      res.status(404).json({error: 'The specified ID does not exist.'})
    } else {
      next();
    }
  })
}


module.exports = router;
