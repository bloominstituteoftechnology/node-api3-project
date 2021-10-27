const Users = require('../users/users-model');


function logger(req, res, next) {
  console.log(`Time Stamp: ${new Date().toISOString()}, Request Method: ${req.method}, Request URL: ${req.url}`);

  next();
}

async function validateUserId(req, res, next) {
  try {
    const potentialUser = await Users.getById(req.params.id)
    if (!potentialUser) {
      res.status(404).json({ message: "user not found"})
    } else {
      req.user = potentialUser;
      next()
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
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
  logger,
  validateUserId,
  validateUser,
  validatePost
}