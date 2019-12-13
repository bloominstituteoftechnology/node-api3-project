async function validateUser() {
    return (req, res, next) => {
        try {
            user.get(req.body)
            if (!user) {
                req.user = user
                next()
                return res.status(400).json({ message: "missing user data" })
            }

            const userName = await db.get(req.body)
            if (!userName) {
                req.userName = userName
                next()
                return res.status(400).json({ message: "missing required name field" })
            }

            const userData = await db.get(req.body)
            return res.status(200).json(userData)
        }
        catch (err) {
            next(err)
        }
    }
}