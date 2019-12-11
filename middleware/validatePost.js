const userRouter = require('../users/userRouter')
const postRouter = require('../posts/postRouter')

async function validatePost() {
    return (req, res, next) => {
        try {
           post.insert(req.body)
           if (!post) {
               req.post = post
               next()
               return res.status(400).json({ message: "missing post data" })
           }

           const text = await db.insert(req.body)
           if (!text) {
               req.text = text
               next()
               return res.status(400).json({ message: "missing required text field" })
           }

           const newPost = await db.insert(req.body)
           return res.status(200).json(newPost)
        }
        catch (err) {
            next(err)
        }
    }
}

module.export = { 
    validatePost,
}

// res.json(req.post) res.json(req.text) - in api endpoint call
// req.post = post - req.text = text - in function
// next()