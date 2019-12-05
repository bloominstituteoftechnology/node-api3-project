const express = require('express');

const Users = require("./userDb")

const Posts = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users
  .insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(() => {
    res.status(500).json({errorMessage: "we couldnt create that user for you bud"})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Posts
  .insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(() => {
    res.status(500).json({errorMessage: "couldnt add that new post to the database"})
  })
});

router.get('/', checkRole("admin"), (req, res) => {
  Users
  .get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(() => {
    res.status(500).json({errorMessage: "cant get the users from the data base sorry buddy"})
  }) 
});

router.get('/:id',validateUserId, (req, res) => {
  res
    .status(200)
    .json(req.user);
});

router.get('/:id/posts',validateUserId, (req, res) => {
  Users
  .getUserPosts(req.user.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    res.status(500).json ({errorMessage: "cant get this users post from the data base"})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(removed => {
      res.status(200).json({errorMessage: "user deleted", removed})
  })
  .catch(() => {
    res.status(500).json ({errorMessage: "i have no clue i cant force this to work something is wrong"})
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users
  .update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(() => {
    res.status(500).json({errorMessage: "couldnt make those changes to the user"})
  })
});

router.put('/:id/posts/user_id', validateUserId, validateUser, (req, res) => {
  Posts
  .update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(() => {
    res.status(500).json({errorMessage: "couldnt make those changes to the post"})
  })
});

//custom middleware
function checkRole(role) {
  return function(req, res, next) {
    if (role && role === req.headers.role) {
      next();
    }else {
      res.status(403).json({errorMessage: "cant touch that you not admin, or an agent"})
    }
  }
}

function validateUserId(req, res, next) {
  const userId = req.params.id || req.body.user_id;
  Users
  .getById(userId)
  .then(user => {
    if (user) {
      req.user = user;
    return next()
    }else {
      res.status(400)
      .jsonn({errorMessage: "that is not a valid id"})
    }
  })
  .catch(() => {
    res.status(500).json({errorMessage: "cant find that user in our data"})
  })
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({errorMessage: "cant find user data"})
  }else if (!req.body.name) {
    res.status(400).json({errorMessage: "name is gunna be required bud"})
  }else{
    return next()
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({errorMessage: "cant find post data"})
  }else if (!req.body.text) {
    res.status(400).json({errorMessage: "text is gunna be required bud"})
  }else{
    req.body.user_id = req.user.id;
    next()
  }
}

module.exports = router;
