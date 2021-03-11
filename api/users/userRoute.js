const exports = require('express')
const router = express.Router()
const userdb = require('./userDb')
const postdb = require('../posts/postdb')
router.use('/:id', validateUserId)

router.post('/', validateUser, (req, res) => {
    userdb.insert(req.body)
          .then(user => {res.status(201).json(user)})
          .catch(err => {
              console.log('Add User Error: ', err)
              res.status(500).json({ errmessage: 'Unable to create user' })
          })
})

router.post('/:id/posts', validatePost, (req, res) => {
    const userId = req.params.id
    const post = {...req.body, user_id: userId}

    postdb.insert(post)
    .then(user => {res.status(201).json(user)})
    .catch(err => {
      console.log('Unable to create user post:', err)
      res.status(500).json({ errmessage: 'Unable to create post'})
    })
})

router.get('/', (req, res) => {
    userdb.get()
          .then(users => res.status(200).json(users))
          .catch(err => {
            console.log('User GET error: ', err)
            res.status(500).json({error: 'Users unable to be retrieved'})
        })
})

router.get('/:id', (req, res) => {
    res.status(200).json(req.user)
  });

router.delete('/:id', (req, res) => {
    userdb.remove(req.params.id)
          .then(user => res.status(200).json({ message: 'User deleted' }))
          .catch(err => {
            console.log('Deletion error:', err)
            res.status(500).json({ errmessage: 'User unable to be deleted' })
          })
  });

router.put('/:id', validateUser, (req, res) => {
    const userId = req.params.id
    userdb.update(userId, req.body)
          .then(() => {res.status(200).json({ message: 'User updated'})})
          .catch(err => 
            {console.log('update error:' , err)})
            res.status(500).json({ errmessage: 'Unable to update user'})
})

//the middleware

function validateUserId(req, res, next) {
    userdb.getById(req.params.id)
          .then(user => {
              if (user) {
                  req.user = user
                  next()
              } else {
                  res.status(400).json({ message: 'invalid user id' })
              }
          })
          .catch(err => {
              err => {
                  console.log('getUserById error:' , err)
                  res.status(500).json({ errmessage:'Unable to retrieve user' })
              }
          })
}

function validateUser(req, res, next) {
    if (req.body) {
        if (req.body.name) {
            next()
        } else {
            res.status(400).json({ message: 'Name required. Please fill name field' })
        }
    } else {
        res.status(400).json({ message: 'User data missing.' })
    }
}

function validatePost(req, res, next) {
    if (req.body) {
        if (req.body.text) {
            next()
        } else {
            res.status(400).json({ message: 'Missing required text field' })
        }
    } else {
        res.status(400).json({ message: 'Missing post data' })
    }
}

module.exports = router