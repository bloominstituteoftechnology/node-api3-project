const express = require('express');
const postDatabase = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => 
{
  postDatabase.get()
  .then(posts =>
  {
    res.status(200).json(posts);
  })  
  .catch(err =>
  {
    res.status(500).json({message: 'could not retrieve posts'});
  })
});

router.get('/:id', validatePostId, (req, res) => 
{
  res.status(200).json(req.post);
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) 
{
  postDatabase.getById(req.params.id)
  .then(post =>
  {
    if(post)
    {
      req.post = post;
      next();
    }
    else
    {
      res.status(400).json({message: 'invalid post ID'});
    }
  })
  .catch(err =>
  {
    res.status(500).json({message: 'Could not validate'});
  })
}

module.exports = router;
