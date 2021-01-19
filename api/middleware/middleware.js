function logger(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
const {id} = req.params;
User.getByID(id)  //need to define User
.then(user => {
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(404).json({message: 'ID not found'})
  }
})
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'Error beep boop!', err})
  })

}

function validateUser(req, res, next) {
if (req.user && Object.keys(req.user).length > 0) {
  next();
} else {
  res.status(400).json({message: 'please include a valid user'})
}
}

function validatePostId(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// do not forget to expose these functions to other modules
