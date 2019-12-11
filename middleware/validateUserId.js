function validateUserId() {
    return (req, res, next) => {
        try {
            userId.getById(req.body.id)
            if (!id) {
                return res.status(400).json({ message: "missing user data" })
            }

            const name = await db.getById(req.body.id)
            if (!name) {
                return res.status(400).json({ message: "missing required name field" })
            }

            const newUser = await db.getById(req.body)
            return res.status(200).json(newUser)
        }
        catch (err) {
            return (err)//res.status(500).json({ errorMessage: "New User not setup." })
        }
        next()
    }
}