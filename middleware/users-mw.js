const User = require('../users/userDb')

function validateUserId(req, res, next) {
    const { id } = req.params
  
    User.getById(id)
    .then(user => {
        if(!user){
            res.status(400).json({ message: 'This user ID does not exist.' })
        } else {
            next()
        }
    })
}
  
function validateUser(req, res, next) {
    const { name } = req.body
  
    if(!req.body) {
        res.status(400).json({ message: 'missing user data' })
    } else if (!name) {
        res.status(400).json({ message: 'missing required name field' }  )
    } else {
        next()
    }
}

function validatePost(req, res, next) {
    const { text } = req.body
  
    if(!req.body) {
        return res.status(400).json({ error: 'Missing post data'})
    } else if (!text) {
        return res.status(400).json({ error: 'Missing required text field'})
    } else {
        next()
    }
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}