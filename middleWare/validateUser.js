function validateUser(req, res, next) {
    if (!req.body.name){
      res.status(400).json({error: 'user name is required in the body'})
    } else {
      console.log('user validated')
      next()
    }
  }

  module.exports = validateUser