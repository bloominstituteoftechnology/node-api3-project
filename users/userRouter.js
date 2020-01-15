const express = require('express');

const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')
const router = express.Router();

// works
router.post('/', validateUser, (req, res) => {
  // do your magic!
  // post the user
  // let sql deal with the id
  let user = req.body
  // console.log('adding', user)
  Users.insert(user)
    .then(addedUser => {
        res.status(200).json(addedUser)
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be added." })

    })
});

// works
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  console.log('the id and the post both exist')
  let id = req.params.id
  let post = req.body
  // console.log(post)
  // the post table needs the user_id and the text to insert
  Posts.insert({...post, user_id: id})
    .then(addedPost => {
      console.log('added')
      res.status(200).json(addedPost)
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be added." })
    })
  // res.status(404).json({error: "the id and the user both exist"})
});


router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      // (Server Error)
      res.status(500).json({ error: "The users information could not be retrieved." })

    })
  // console.log('get')

});

// works
router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  let id = req.params.id
  Users.getById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be retrieved." })

    })
});

// works
router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!

  let id = req.params.id

  Users.getUserPosts(id)
    .then(userPost => {
      res.status(200).json(userPost)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved." })

    })
});

// works
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!

    
  let id = req.params.id
  // let user = req.body
  Users.remove(id)
    .then(deletedUser => {
      res.status(200).json(deletedUser)
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be deleted." })

    })
});

// works
router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  console.log('the id and the user both exist')
  let id = req.params.id
  let user = req.body
  Users.update(id, user)
    .then(updatedUser => {
      console.log('updated')
      res.status(200).json(updatedUser)
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be modified." })
    })
  // res.status(404).json({error: "the id and the user both exist"})
});

//custom middleware

// these appear to cover the errors with validating the user data
// they don't cover the error messages that come with running the sql calls
function validateUserId(req, res, next) {
  // do your magic!
  let id = req.params.id
  Users.getById(id)
    .then(user => {
      // console.log(user)
      // not used anywhere
      req.user = user
      next()
    })
    .catch(err => {
      res.status(400).json({ message: "invalid user id" })
    })

  }

function validateUser(req, res, next) {
  // do your magic!
  let { body } = req
  // console.log('body', body)
  if(Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing user data" })
  } else {
    let { name } = body
    if(!name) {
      // console.log('big problem')
      res.status(400).json({ message: "missing required name field" })

    } else {
      // console.log('can add')
      next()
    }
  }

}

function validatePost(req, res, next) {
  let { body } = req
  // console.log('body', body)
  if(Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing post data" })
  } else {
    let { text } = body
    if(!text) {
      // console.log('big problem')
      res.status(400).json({ message: "missing required text field" })

    } else {
      // console.log('can add')
      next()
    }
  }


}

module.exports = router;
