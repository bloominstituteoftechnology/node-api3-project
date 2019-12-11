import { userInfo } from "os"

function validateUser(), async {
    return (req, res, next) => {
        try {
            user.get(req.body)
            if (!user) {
                return res.status(400).json({ message: "missing user data" })
            }

            const userName = await db.get(req.body)
            if (!userName) {
                return res.status(400).json({ "missing required name field" })
            }

            const userData = await db.get(req.body)
            return res.status(200).json(userData)
        }
        catch (err) {
            return (err)
        }
        next()
    }
}