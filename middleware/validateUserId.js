
    async function validateUserId(req, res, next) {
        if (!req.params.id) {
            return res.status(400).json({ message: "invalid user id" })
        }
        next()
    }

    module.exports = validateUserId