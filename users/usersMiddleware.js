const users = require('./userDb');

function validateUserId() {
    return (req, res, next) => {
        users.getById(req.params.id)
            .then(user => {
                if(user) {
                    req.user = user;
                    next();
                } else {
                    res.status(404).json({
                        message: 'That user isn\'t here',
                    });
                }
            })
            .catch(err => next(err));
    }
}

function validateUser() {
    return (req, res, next) => {
        if(!req.body.name) {
            res.status(400).json({
                message: 'We need your name',
            });
        } else {
            next();
        }
    }
}

function validatePost() {
    return (req, res, next) => {
        if(!req.body.text) {
            return res.status(400).json({
                message: 'We need some text',
            })
        } else {
            next();
        }
    }
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost,
}