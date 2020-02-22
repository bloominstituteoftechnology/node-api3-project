//imports
const express = require("express")
const postData = require("./postDb")

const postRouter = express.Router()

postRouter.get("/", async (req, res, next) => {
    try {
        res.json(200).json(post)
    } catch (err) {
        next(err)
    }
})

postRouter.get("/:id", validatePostId, async (req, res, next) => {
    try {
        res.status(200).json(req.post)
    } catch (err) {
        next(err)
    }
})

postRouter.delete("/:id", validatePostId, async (req, res, next) => {
    try {
        const deletePost = posts.remove(req.params.id)
        res.status(200).json({ message: "The post is delete" })
    } catch (err) {
        next(err)
    }
})

postRouter.put("/:id", validatePostId, async (req, res, next) => {
    try {
        const updatePost = posts.update(req.params.id, req.body)
        res.status(200).json({ message: "Post has been Update" })
    } catch (err) {
        next(err)
    }
})

// custom middleware

async function validatePostId(req, res, next) {
    try {
        const post = await postData.getById(req.params.id)
        if (post) {
            req.post = post
            next()
        } else {
            res.status(400).json({ message: "Post not found" })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = postRouter
