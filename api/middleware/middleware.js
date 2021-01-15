const posts = require('../posts/posts-model');
const users = require('../users/users-model');

function validateUserId(req, res, next) {
  // do your magic!
  console.log('validating user id')
  const id = req.params.id
  console.log('user id', id)
  users.getById(id)
  .then(user => {
    console.log('inside then', user)
    if (user) {
      req.user = user
      next();
      // res.status(200).json(user)
    } else {
      res.status(404).json(`user with id ${id} not found`)
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json('ouch')
  })
}

function validateUser(req, res, next) {
  // do your magic!
  console.log('checking request body')
  const body  = req.body
  users.update(req.params.id, body)
  .then(user => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'asfasf'})
    }
    next()
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error updating the adopter',
    });
  })
  // if (body) {
  //   next()
  // } else {
  //   res.status(400).jon({ error: "please provide text for your post"})
  // }
}

async function validatePostId(req, res, next) {
  // do your magic!
console.log('checking post id')
  res.set('x-header', 'x3')
  try {
    const post = await posts.getById(req.params.id)
    console.log('',post)
    if (post) {
      req.post = post
    } else {
      res.status(404).json(`post with id ${req.params.id} not fonud`)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('ouch')
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  console.log('checking request body')
  const body  = req.body
  if (body.text || body.user_id) {
    next()
  } else {
    res.status(400).jon({ error: "please provide text for your post"})
  }
}

function logger(req, res, next) {
  // do your magic!
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
    'Origin')}`)
    next();
}


// do not forget to expose these functions to other modules
module.exports = {logger, validatePost, validatePostId, validateUserId, validateUser}