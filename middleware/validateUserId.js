const db = require('../users/userDb')

function validateUserId ( req, res, next ) {
    console.log('test', req)
    db.getById(req.params.id)
    .then(user => {
        if (!user){
            res.status(400).json({ message: "invalid user id" })
        } else {
            req.user = user;
           
        } next();
    })
    .catch(error)
}

module.exports = validateUserId