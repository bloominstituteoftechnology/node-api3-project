const User = require("../../users/userDb");

function validateUser(req, res, next) {
  const { body } = req.body;

  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else {
    User.get(body)
      .then(userName => {
        if (!userName) {
          res.status(400).json({ message: "missing required name field" });
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "beep beep boop?"
        });
      });
  
  }
  next();
}

module.exports = validateUser
