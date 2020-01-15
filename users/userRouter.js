const express = require('express');

const Users = require('./userDb.js')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
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

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  console.log('trying to delete')
  // do your magic!
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
      req.user = user
      next()
    })
    .catch(err => {
      res.status(400).json({ message: "invalid user id" })
    })
  // console.log('here instead')
  
  // if user id is valid
  // next
    // else error
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
      // next()
    } else {
      // console.log('can add')
      next()
    }
  }
  // console.log("validate user", req.user)

  // console.log(Object.keys(body).length)
  // console.log('validate user')
  // next()
  // if user is valid
  // next
    // else error

}

function validatePost(req, res, next) {
  // do your magic!
    // if post is valid
  // next
    // else error

}

module.exports = router;
