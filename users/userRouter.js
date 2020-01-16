const express = require('express');

const router = express.Router();

const User = require('../users/userDb.js')

router.post('/', (req, res) => {
  // do your magic!
  User.add(req.name)
    .then(user => {
        if (user) {
      res.status(201).json(user);
        } else {
            res.status(500).json({message: 'cannot add user'})
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the user',
      });
    });
  });
  


router.post('/:id/posts', (req, res) => {
  // do your magic!

  User.add(req.body)
    .then(post => {
        if (post) {
      res.status(201).json(post);
        } else {
            res.status(500).json({message: 'cannot add new post for user'})
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the new post',
      });
    });
  });


router.get('/', (req, res) => {
  // do your magic!
  User.find()
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  });
  
});

router.get('/:id', (req, res) => {
  // do your magic!
  User.findById(req.param.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post cannot found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  User.findById(req.param.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post cannot found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been deleted' });
      } else {
        res.status(404).json({ message: 'sorry, cannot delete what i cannot find' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error deleting the post',
      });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!

  const updates = req.body;
    User.update(req.params.id, updates)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'sorry,cannot update what i cannot find' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  User.getById(req.param.id)
      .then(user =>{
        if(user){
          next();
        } else {
          res.status(404)
          .json({Error:})
        }
      })


}

function validateUser(req, res, next) {
  // do your magic!
  if (Object.keys(body).length === 0){
    res.status(400)
    .json({message:'missing user data'})
  }else if(!req.body.name){
    res.status(400)
    .json({message: 'missing required name field'})
  } else {
    next();
  }
  
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body){
    res.status(400)
    .json({message:'missing user data'})
  }else if(!req.body.text){
    res.status(400)
    .json({message: 'missing required name field'})
  } else {
    next();
  }
}



module.exports = router;
