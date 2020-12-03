const express = require('express');
const userData = require('./userDb');
const postData = require('../posts/postDb');
const router = express.Router();

router.use(express.json());

//validation for user id
function validateUserId(req, res, next) {
  if (req.params.id) {
    next()
  } else {
    res.status(400).json({ message: 'Invalid user Id!' })
  };
};

//validation for user
function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else if (req.body === null) {
    res.status(400).json({ message: 'User data is missing'});
  } else {
    res.status(400).json({ message: 'User name is missing' });
  };
};

//post validation
function validatePost(req, res, next) {
  if (req.body.text && req.body.user_id) {
    next();
  } else if ((req.body = null)) {
    res.status(404).json({ message: 'Missing post data' });
  } else {
    res.status(404).json({ message: 'Mssing text field' });
  };
};

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;
  userData
    .insert(newUser)
    .then((res) => {
      res.status(201).json(res);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: 'Could not add user!' });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  let postdata = req.body
  console.log(postdata)
  postData
    .insert(postdata)
    .then((res) => {
      res.status(201).json(res);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: 'Failed to add post' });
    });
});

router.get('/', (req, res) => {
  userData
    .get(req)
    .then((resp) => {
      res.status(200).json({ data: resp });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ ErrorMessage: 'Could not get users!' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  userData
    .getById(req.params.id)
    .then((res) => {
      if (res) {
        res.status(200).json(res);
      } else {
        res
          .status(404)
          .json({ ErrorMessage: `User with this id ${id} does not exist!` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ ErrorMessage: `Could not find user with this id ${id}` });
    });
});

//custom middleware

router.get("/:id/posts", validateUserId, (req, res) => {
  userData
    .getUserPosts(req.params.id)
    .then((res) => {
      if (res) {
        res.status(200).json(res);
      } else {
        res.status(404).json({ ErrorMessage: 'User has no post' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        ErrorMessage: `Could not locate users posts with this id ${id}`,
      });
    });

    router.delete('/:id', validateUserId, (req, res) => {
      userData
        .remove(req.params.id)
        .then((user) => {
          if (user) {
            res.status(200).json({ message: 'User has been removed'});
          } else {
            res.status(404).json({ message: 'User could not be found'});
          }
        })
        .catch((err) => {
          res
            .status(500)
            .json({ ErrorMessage: 'User could not be found or deleted' });
        });
    });

  router.put("/:id", validateUserId, (req, res) => {
    const updateUser = req.body;
    userData.update(req.params.id, updateUser).then((resp) => {
      res.status(201).json(resp);
    });
  });

module.exports = router;
