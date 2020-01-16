function validateUserId(req, res, next){
  
  Users.getById(req.params.id)
    .then(user=>{
      if (!user){
        res.status(404).json({error: 'Could not find user'})
      } else {
        console.log('validated users id')
         next()
      }
    })
}

  module.exports = validateUserId