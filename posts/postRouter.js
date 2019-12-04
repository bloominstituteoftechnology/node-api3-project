const express = require('express');
const Utils = require('../MiddleWare/Utils')
const db = require('./postDb');


const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then((users)=>{
    res.status(200).json({users})
  })
  .catch((err)=>{
    res.json({err})
  })

});

router.get('/:id', Utils.validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  db.getById(id)
  .then(post=>{
    res.status(200).json({post})
  })
  .catch(err=>{
    res.status(404).json({err})
  })
});

router.delete('/:id', Utils.validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  db.remove(id)
  .then(d=>{
    res.status(201).json({d})
  })
  .catch(err=>{
    res.status(400).json({err})
  })
});

router.put('/:id', Utils.validatePostId, Utils.validatePost, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  db.update(id,body)
  .then((post)=>{
    res.status(201).json({post})
  })
  .catch(err=>{
    res.status(500).json({message: 'something went wrong'})
  })
});

// custom middleware



module.exports = router;
