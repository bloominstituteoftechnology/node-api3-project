function validateUserId(req, res, next) {
    // do your magic!
    db.getById(req.params.id)
      .then(users => {
        if (users) {
          req.user = users;
          next();
        }
        else {
          res.status(500).json({ message: "No user with this ID exists" })
        }
      })
      .catch(error => {
        res.status(500).json({ message: "need to give an ID"})
      })
  }
  
  function validateUser(req, res, next) {
    // do your magic!
    if (req.body) {
      if (req.body.name) {
        next();
      }
      else {
        res.status(400).json({ message: "Missing name" })
      }
    } else {
      res.status(400).json({ message: "Missing user data" })
    }
  }
  
  function validatePost(req, res, next) {
    // do your magic!
    if (req.body) {
      if (req.body.text) {
        next();
      } else {
        res.status(400).json({ message: "Missing required text field" });
      }
    } else {
      res.status(400).json({ message: "Missing post data" });
    }
  }

  module.exports = { validatePost, validateUser, validateUserId}