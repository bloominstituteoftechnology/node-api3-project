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

async function validateUser(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "missing required name field"});
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function validatePost(req, res, next) {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// do not forget to expose these functions to other modules


module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}