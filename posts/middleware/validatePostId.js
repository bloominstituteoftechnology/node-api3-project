const { getById } = require("../postDb.js");

module.exports = function(req, res, next) {
    const id = req.params.id;
    getById(id)
        .then(posts => {
            if (!posts) res.status(400).json({ message: "Invalid post ID"});
            else next();
        })
        .catch(err => {
            res.status(500).json({ 
                message: "Error validating user ID",
                error: err,
                error_message: err.message
            })
        });
};
