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

function validateUserId(req, res, next) {
  User.getById(req.params.id)
  .then(possibleUser => {
    if (possibleUser) {
      req.user = possibleUser
      next()
    } else {
      next({ status: 404, message: 'user not found' })
      }
    })
    .catch(next)
}

// -------------------------------------------
// Notes for myself: Async way- delete as soon as I feel confident
// The code below passed the test also.
// -------------------------------------------
// async function validateUserId(req, res, next) {
//   try {
//     const possibleUser = await User.getById(req.params.id)
//     if(!possibleUser){
//       next({ status: 404, message: 'user not found' })
//     } else {
//       req.user = possibleUser
//       next();
//     }
//   } catch (err) {
//     next(err)
//   }
// }

// -------------------------------------------
// Notes for myself: the code below validate user without schema
// Keeping just for learning purpose
// -------------------------------------------

// function validateUser(req, res, next) {
//   const { name } = req.body;
//     if (name) {
//       next();
//     } else {
//       next({ message: "missing required name field", status: 400 });
//     }
// }

// -------------------------------------------
// Notes for myself: this is the way that Gabe posted
// -------------------------------------------
// function validateUser(req, res, next) {
//   const { name } = req.body;
//     if (!name || !name.trim()) {
//       res.status(400).json({
//         message: 'missing required name field',
//       })
//     } else {
//       req.name = name.trim()
//       next();
//     }
// }


const userSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('name needs to be a string')
    .trim('whitespace alone does not count')
    .required('you NEEED to supply name')
    .min(3, 'name needs to be 3 chars long')
    .max(100, 'name cannot be longer than 100')
})

async function validateUser(req, res, next) {
  try {
    const validated = await userSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    next({ message: "missing required name field", status: 400 })
  }
}
  
// -------------------------------------------
// Notes for myself: the code below validate post without schema
// Keeping just for learning purpose
// -------------------------------------------
// function validatePost(req, res, next) {
//   const { text } = req.body;
//   if (text) {
//     next();
//   } else {
//     next({ message: "missing required text field", status: 400 });
//   }
// }

const postSchema = yup.object().shape({
  text: yup
    .string()
    .typeError('name needs to be a string')
    .trim('whitespace alone does not count')
    .required('you NEEED to supply a text')
    .min(3, 'text needs to be 3 chars long')
    .max(500, 'text cannot be longer than 500')
})

async function validatePost(req, res, next) {
  try {
    const validated = await postSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    next({ message: "missing required text field", status: 400 })
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  handleError,
  logger,
  validateUserId,
  validateUser,
  validatePost,
}