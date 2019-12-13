// don't need to export into middleware

async function validatePost(req, res, next) {
    // place async after return to include it in the same function with await. 
    if (!req.body) {
        return res.status(400).json({ message: "missing post data"})
    }

    if (!req.body.text) {
        return res.status(400).json({ message: "missing required text field"})
    }
    next()
}

module.exports = validatePost

// res.json(req.post) res.json(req.text) - in api endpoint call
// req.post = post - req.text = text - in function
// next()