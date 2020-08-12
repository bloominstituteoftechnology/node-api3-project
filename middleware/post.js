const posts = require("../posts/postDb");

function validatePost() {
    return (req, res, next) => {
        if (!req.body)
            return res.status(400).json({ message: "Missing post data" });
        else if (!req.body.text)
            return res.status(400).json({ message: "Missing required text field" });
        next();
    };
}

function validatePostId() {
    return (req, res, next) => {
        posts
            .getById(req.params.id)
            .then((post) => {
                if (post) {
                    req.post = post;
                    next();
                } else {
                    res.status(400).json({ message: "Invalid post id" });
                }
            })
            .catch(next);
    };
}

module.exports = {
    validatePost,
    validatePostId
};
