const express = require('express');

const Posts = require('./postDb');
const { route } = require('../users/userRouter');

// router.use(validatePostId);

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.find(req.query)
  .then(pos => {
    res.status(200).json(pos);
  })
  .catch(err => {
    res.status(500).json({
      message: 'Error retrieving the user',
    })
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.usr)

});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: 'The user has been eliminated'})
    } else {
      res.status(404).json({message: 'Teh User could not be found'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error removing the user', err})
  })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
    .then(usr => {
      if (usr) {
        res.status(200).json(usr);
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error updating the user', error });
});
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  Posts.findById(id)
  .then(pos => {
    if (pos) {
      req.pos = pos;
      next();
    } else {
      // res.status(404).json({ message: 'does not exist' });
      next(new Error('does not exist'));
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'exception', err });
  });

}

module.exports = router;
