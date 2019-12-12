const userRouter = require('../users/userRouter')
const postRouter = require('../posts/postRouter')

async function validateUserId() {
    return (req, res, next) => {
        try {
            userId.getById(req.body.id)
            if (!id) {
                req.id = id
                next()
                return res.status(400).json({ message: "missing user data" })
            }

            const name = await db.getById(req.body.id)
            if (!name) {
                req.name = name
                next()
                return res.status(400).json({ message: "missing required name field" })
            }

            const newUser = await db.getById(req.body)
            return res.status(200).json(newUser)
        }
        catch (err) {
            next(err)//res.status(500).json({ errorMessage: "New User not setup." })
        }
    }
}

module.export = router