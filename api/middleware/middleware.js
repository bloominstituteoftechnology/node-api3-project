function logger(req, res, next) {
  return (req, res, next) => {
    const time = new Date().toISOString();
    switch (format) {
       case "custom":
           console.log(`Logger: [${time}] ${req.method} ${req.url}`);
        }
       next();
     };
}

function validateUserId(req, res, next) {
  return (req, res, next) => {
    db.getById(req.params.id)
        .then((userId) => {
            if(userId) {
                req.userId = userId
                next()
            } else {
                res.status(404).json({
                   message:`User ${req.params.id} not found`
               })
            }
        })
        .catch(() => {
            res.status(500).json({
              message: "Oops, something went wrong",
            });
          });
  }
}

function validateUser(req, res, next) {
  return (req, res, next) => {
    const {user} = req.body
    if(!user) {
        return res.status(404).json({
            errorMessage: "Please provide user data",
       })
    }
    req.user = user
    next()
  }
}

function validatePostId(req, res, next) {
  return (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "missing post data"
        })
    } else if (!req.body.name) {
        return res.status(400).json({
            message: "missing required text field"
        })
    }
    next()
  }
}

function validatePost(req, res, next) {
  return (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "missing post data"
        })
    } else if (!req.body.name) {
        return res.status(400).json({
            message: "missing required text field"
        })
    }
    // req.data = req.body
    next()
  }
}

// do not forget to expose these functions to other modules
