const express = require('express');

const router = express.Router();
const db = require('./userDb');

//global middleware
const logger = (req, res, next) => {
  console.log(req.method, req.url, new Date());
  req.userName = 'Denis';
  next();
};
router.use(logger);

router.param('id', validateUserId);

//request handlers
router.post('/', validateUser, (req, res) => {
  // const id = req.params.id;
  // const newPost = { body: req.body.text, id };
  db.insert(req.body)
    .then((post) => {
      res.status(200).json({ created: post });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
  res.status(200).json({ status: 'Successful' });
});

router.get('/', getUsers, (req, res) => {});

router.get('/:id', (req, res) => {
  res.json(req.user);
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id).then((posts) => res.status(200).json(posts));
});

router.delete('/:id', deleteUser, (req, res) => {});

router.put('/:id', validateUser, (req, res) => {
  db.update(req.params.id, req.body).then((updatedCount) => res.status(200).json({ updated: updatedCount }));
});

//custom middleware
function validateUserId(req, res, next, id) {
  /*
  1. check if id exists in database
  2. if user validates, set user to req.user
  3. else throw 400. 
  */
  db.getById(id).then((maybeUser) => {
    if (!maybeUser) {
      return res.status(400).json({ message: 'invalid user id' });
    }
    req.user = maybeUser;
    next();
  });
}

function validateUser(req, res, next) {
  /*
  1. check if body exists
  2. check if 'name' field in body exists
  3. if any fail, throw respective 400
  */
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'missing user data' });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: 'missing required name field' });
  }

  res.status(200).json({ validated: req.body });

  next();
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: 'missing post data' });
  }
  if (!req.body.text) {
    return res.status(400).json({ message: 'missing required text field' });
  }
  next();
}

function getUsers(req, res, next) {
  db.get()
    .then((users) => res.status(200).json({ users: users }))
    .catch((err) => console.log(err));
  next();
}

function deleteUser(req, res, next) {
  db.remove(req.params.id)
    .then((deletedId) => res.status(204).end())
    .catch((error) => console.log(error));
  next();
}

module.exports = router;
