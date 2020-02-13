const express = require('express');

const Hubs = './postDb.js';

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Hubs.get()
    .then(hubs => {

    })
    .catch(err => {
      console.log(err); 
      res.status(500).json({"There is something wrong with url"})
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  // do your magic!
  Hubs.getById(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({message: `The provided id ${id} isincorrect`});
    });
});

router.remove('/:id', (req, res) => {

  const {id} = req.params;
  Hubs.remove(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({message: `The provided id ${id} isincorrect`});
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  Hubs.update(id)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({message: `The provided id ${id} isincorrect`});
    });
});


router.post('/posts', (req, res) => {

  const post = req.body;
    Hubs.insert(post)
      .then(hubs => {
        res.status(200).json(hubs)
      })
      .catch(err => {
        res.status(500).json({message: "Something is wrong!"})
      })
})

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return function(req, res, next) {
    const realId = req.headers.id;
    if (realId === id) {
      next();
    } else {
      res.status(401).json({errMessage: 'Invalid Id'});
    }
  };
}

module.exports = router;
