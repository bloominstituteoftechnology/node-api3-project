const express = require('express');

const router = express.Router();

const db = require('./postDb');


router.get('/', (req, res) => {
  
  db.get()
      .then(response => {
        res.json(response)
      })
      .catch(err => {
        res.status(500).json({message: "The Post information could not be retrieved."})
      })

});


router.get('/:id', (req, res) => {
  
  db.getById(req.params.id)
      .then(response => {

        if(response.length != 0){
            res.json(response)
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
        
      })
      .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved." })
      })

});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
