const express = require('express');

const Users = require("./userDb")

const Posts = require("../posts/postDb")

const router = express.Router();

const easyErr = (status, message, res) => {
  res.status(status).json({error: message})
}
router.post('/', validateUser, (req, res) => {
  Users
  .insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(() => {
    easyErr(500, "we couldnt create that user for you buddy", res)
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Posts
  .insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(() => {
    easyErr(500, " couldnt add that new post to the database", res)
  })
});

router.get('/', checkRole("admin"), (req, res) => {
  // const message = process.env.MSG || "hello world"
  Users
  .get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(() => {
    easyErr(500, "cant get the users from the data base sorry buddy", res)
  }) 
});

router.get('/:id',validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts',validateUserId, (req, res) => {
  Users
  .getUserPosts(req.user.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    easyErr(500, "cant get this users post from the data base", res)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(removed => {
    easyErr(200, "user deleted", res)
  })
  .catch(() => {
    easyErr(500, "i have no clue i cant force this to work something is wrong", res)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users
  .update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(() => {
    easyErr(500, "couldn't make those changes to the user", res)
  })
});
//FIALED ATTEMPT TO UPDATE POST BY USER ID
// router.put('/:id/posts/user_id', validateUserId, validateUser, (req, res) => {
//   Posts
//   .update(req.params.id, req.body)
//   .then(post => {
//     res.status(200).json(post)
//   })
//   .catch(() => {
//     res.status(500).json({errorMessage: "couldnt make those changes to the post"})
//   })
// });

//custom middleware
function checkRole(role) {
  return function(req, res, next) {
    if (role && role === req.headers.role) {
      next();
    }else {
      easyErr(403, "cant touch that you not admin, or an agent", res)
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
    } else {
      easyErr(400, "that is not a valid id", res)
    }
  })
  .catch(() => {
    easyErr(500, "cant find that user in our data", res)
  })
}

function validateUser(req, res, next) {
  // const {name} = req.body
  
//   if (!req.body) {
//     easyErr(400, "missing user data", res)
//   } else if (!req.body.name){
//     easyErr(400, "missing required", res)
//   } else {
//     return next()
//   }
// }

  if (!Object.entries(req.body).length) {
    easyErr(400, "cant find user data", res)
  }else if (!req.body.name) {
    easyErr(400, "name is gunna be required bud", res)
  } else {
    return next()
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    easyErr(400, "can't find post data", res)
  }else if (!req.body.text) {
    easyErr(400, "text is gunna be required bud", res)
  }else{
    req.body.user_id = req.user.id;
    next()
  }
}

module.exports = router;
