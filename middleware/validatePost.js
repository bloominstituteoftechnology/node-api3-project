function validatePost(), async {
    return (req, res, next) => {
        try {
           post.insert(req.body)
           if (!post) {
               return res.status(400).json({ message: "missing post data" })
           }

           const text = await db.insert(req.body)
           if (!text) {
               return res.status(400).json({ "missing required text field" })
           }

           const newPost = await db.insert(req.body)
           return res.status(200).json(newPost)
        }
        catch (err) {
            return (err)
        }
        next()
    }
}