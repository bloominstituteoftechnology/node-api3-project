
    async function validateUserId(req, res, next) {
            if (user) {
                req.user = user
            }
       
        if (!req.params.id) {
            return res.status(400).json({ message: "invalid user id" })
        } 
            next(err)
        }
 
    module.exports = validateUserId