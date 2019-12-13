
    async function validateUserId(req, res, next) {
        try {
            const user = await users.getById(req.params.id)
            
            if (user) {
                req.user = user
                next()
            } else {
                return res.status(400).json({ message: "invalid user id" })
            }
        } catch (err) {
            next(err)
        }
    }
 
    module.exports = validateUserId