const Users = require("../users/userDb");

module.exports = function validateUserId(req, res, next) {
    const { id } = req.params;
    Users
    .getById(id)
    .then(user => {
        if (user) {
            req.user = user;
            next();
        } else if (!user) {
            res.status(404).json({
                message: "could not find user with that ID"
            })
        }
    })

}