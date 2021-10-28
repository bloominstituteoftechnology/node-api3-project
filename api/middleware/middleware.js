const User = require('../users/users-model');
const yup = require ('yup');

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message:err.message,
    prodMessage: 'something went really wrong!',
  });
}

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  console.log(`[${timestamp}][${req.method}] ${req.url}`)
  next()
}

// function validateUserId(req, res, next) {
//   User.getById(req.params.id)
//   .then(possibleUser => {
//     if (possibleUser) {
//       req.user = possibleUser
//       next()
//     } else {
//       next({ status: 404, message: 'user not found' })
//       }
//     })
//     .catch(next)
// }

async function validateUserId(req, res, next) {
  try {
    const possibleUser = await User.getById(req.params.id)
    if(!possibleUser){
      next({ status: 404, message: 'user not found' })
    } else {
      req.user = possibleUser
      next();
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  handleError,
  logger,
  validateUserId,
  validateUser,
  validatePost,
}