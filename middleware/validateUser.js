async function validateUser(req, res, next) {
    if (!req.body) {
        return res.status(400).json({ message: "missing user data" })
    }

    if (!req.body.name) {
        return res.status(400).json({ message: "missing required name field" })
    }           
     next(err)
}

module.exports = validateUser