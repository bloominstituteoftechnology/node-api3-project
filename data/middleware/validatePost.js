const User = require("../../users/userDb")



function validatePosts(req, res, next) {
    const { body } = req.body;

    if (!body) {
      res.status(400).json({ message: "missing post data" });
    } else {
      User.get(body)
        .then(userName => {
          if (!userName) {
            res.status(400).json({ message: "missing required text field" });
          }
        })
        .catch(err => {
          res.status(500).json({
            errorMessage: "beep beep boop?"
          });
        });
    
    }
 next()
}

module.exports = validatePosts