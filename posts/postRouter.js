const express = require('express');

const router = express.Router();

const Methods = require('./postDb');
const { update } = require('../data/dbConfig');

router.get('/', (req, res) => {
  Methods.get(req.query)
  .then( all => {
    res.status(200).json(all)
  })
  .catch( err=>{
    console.log(err)
    res.status(500).json({
      message: ' We Had troule retrieving your data'
    })
  })
});



router.get('/:id',validatePostId, (req, res) => {
  Methods.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch( err=> {
    console.log(err)
    res.status(500).json({
      message: 'We had trouble retrieving your data'
    })
  })
});

router.delete('/:id', validatePostId, (req, res) => {
    Methods.remove(req.params.id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch( err => {
      console.log(err)
      res.status(500).json({message: "We had trouble retrieving your data"})
    })
});

router.put('/:id', validatePostId, (req, res) => {
    Methods.update(req.params.id, req.body)
    .then( updated => {
      res.status(200).json(updated)
    })
    .catch( err => {
      console.log(err)
      res.status(500).json({
        message: " We had trouble retreiving your data"
      })
    })
});

// custom middleware

function validatePostId(req, res, next) {
   Methods.getById(req.params.id)
   .then( val => {
     if(val){
       next()
     }else {
       res.status(404).json({ message: "User ID not found"})
     }
   })
  }

module.exports = router;
