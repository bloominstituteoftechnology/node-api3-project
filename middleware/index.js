const postDB = require('../posts/postDb')
const userDB = require('../users/userDb')

function logger(req, res, next) {
    console.log(`request method: ${req.method}, request url: "${req.url}", request timestamp: ${Date()} `)
    next()
}

async function validateUserId(req, res, next) {
    const found = await userDB.getById(req.params.id)
    if (!found) {
        return res.status(404).json({ message: "invalid user id" })
    }
    res.user = found
    next()
}

function validateUser(req, res, next) {
    if (Object.keys(req.body).length > 0) {
        if (req.body.name) {
            return next()
        }
        return res.status(400).json({ message: "missing required name field" })
    }
    res.status(400).json({ message: "missing user data" })
}

function validatePost(req, res, next) {
    if (Object.keys(req.body).length > 0) {
        if (req.body.text && req.body.user_id) {
            return next()
        }
        return res.status(400).json({ message: "missing required text and user_id field" })
    }
    res.status(400).json({ message: "missing post data" })
}

async function validatePostId(req, res, next) {
    const found = await postDB.getById(req.params.id)
    if (found) {
        req.post = found
        return next()
    } else {
        return res.status(404).json({ message: "Post is not found" })
    }
    res.status(500).json({ message: "uh oh!" })
}

module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
}