
const Users = require('./users-model')
function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
    ${req.method} request to ${req.baseUrl} endpoint!
    req.body ${JSON.stringify(req.body)}
    req.params.id ${req.params.id}
  `)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.findById(req.params.id)
    if (!user) {
      next({ status: 404, message: `user with id ${req.params.id} not found!` })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try
  {
    if(!req.body.name)
    {
      res.status(400).json({message: 'missing required name'})
    }
    next()
  }
  catch (err) 
  {
    next(err)
  }
}

function validatePost(req, res, next) 
{
  // DO YOUR MAGIC
    if(!req.body.name || req.body.text ==='')
    {
      res.status(400).json({ message: "missing required text" })
    }
    next();
}

// do not forget to expose these functions to other modules

module.exports = {logger, validateUserId, validateUser, validatePost}