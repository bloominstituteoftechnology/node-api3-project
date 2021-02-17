
const express = require('express');

const database = require('./userDb');
const postDatabase = require('../posts/postDb');

const errorHandler = require('../utils/errorHandler');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  database.insert(req.body).then(user => {
      res.status(201).json(user);
  }).catch(err => {
    errorHandler(err, 500, 'Could not retrieve users.');
  });
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  newPost = {
    user_id: req.params.id,
    text: req.body.text
  }
  postDatabase.insert(newPost).then(post => {
    res.status(201).json(post);
  }).catch(err => {
    errorHandler(err, 500, 'Could not post.');
});
});

router.get('/', (req, res) => {
  database.get().then(users => {
    res.status(200).json(users);
  }).catch(err => {
    errorHandler(err, 500, "The users information could not be retrieved.");
  });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  database.getUserPosts(req.params.id).then(post => {
    res.status(200).json(post);
  }).catch(err => {
    errorHandler(err, 500, "The user's posts could not be removed");
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  database.remove(req.params.id).then(numDeleted => {
    res.status(200).json(req.user);
  }).catch(err => {
    errorHandler(err, 500, "The user could not be removed");
  });
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  database.update(req.params.id, req.body).then(userID => {
    database.getById(req.params.id).then(user => {
      res.status(200).json(user);
    }).catch(err => {
      errorHandler(err, 500, "The user information could not be retrieved.");
    });
  }).catch(err => {
    errorHandler(err, 500, "The user information could not be modified.");
  });
});

//custom middleware

function validateUserId(req, res, next) {
  database.getById(req.params.id).then(user => {
    if (!user) {
        res.status(400).json({ message: "invalid user id" });
    } else {
      req.user = user;
      next();
    }
  }).catch(err => {
    errorHandler(err, 500, "The user information could not be retrieved.");
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = {router, validatePost};


























































// const express = require('express');

// const router = express.Router();

// router.get('/', (req, res) => {
//   // RETURN AN ARRAY WITH ALL THE USERS
// });

// router.get('/:id', (req, res) => {
//   // RETURN THE USER OBJECT
//   // this needs a middleware to verify user id
// });

// router.post('/', (req, res) => {
//   // RETURN THE NEWLY CREATED USER OBJECT
//   // this needs a middleware to check that the request body is valid
// });

// router.put('/:id', (req, res) => {
//   // RETURN THE FRESHLY UPDATED USER OBJECT
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// router.delete('/:id', (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify user id
// });

// router.get('/:id/posts', (req, res) => {
//   // RETURN THE ARRAY OF USER POSTS
//   // this needs a middleware to verify user id
// });

// router.post('/:id/posts', (req, res) => {
//   // RETURN THE NEWLY CREATED USER POST
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// // do not forget to export the router
