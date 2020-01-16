function validateUserId(req, res, next){
    const id = req.params.id
    Users.getById(idVal)
      .then(user=>{
        if (!user){
          res.status(404).json({error: 'Could not find user'})
        } else {

          next()
        }
      })
  }

  module.exports = validateUserId