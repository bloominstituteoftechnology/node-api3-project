const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await Users.insert(req.body);
    res.status(201).json({ message: 'New User added' });
  } catch {
    res.status(500).json({ errorMessage: 'Error Posting new User' });
  }
});

router.get('/', (req, res) => {
  Users.get(req.body)
    .then(user => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.status(500).json({ errorMessage: 'No user in Database' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: 'Something is wrong with our Database' });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).json(req.user);
    // const user = await Users.getById(id);
    // if (user) {
    //   res.status(200).json(user);
    // } else {
    //   res.status(404).json('No User in Database!');
    // }
  } catch {
    res
      .status(500)
      .json({ errorMessage: 'Something is wrong with our Database' });
  }
});

//---------------------------------------------------------------------/
//Delete
//---------------------------------------------------------------------/
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({
          message: `User With Id ${req.params.id} Deleted from Database`
        });
      } else {
        res.status(404).json({ errorMessage: 'No User to Delete' });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Something is wrong with our Database', error });
    });
});
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = Users.getById(id);
//     if (user) {
//       await Users.remove(user);
//       res
//         .status(200)
//         .json({ message: `User With Id ${id} Deleted from Database` });
//     } else {
//       res.status(404).json({ errorMessage: 'No User to Delete' });
//     }
//   } catch {
//     res
//       .status(500)
//       .json({ errorMessage: 'Something is wrong with our Database' });
//   }
// });

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const user = await Users.getById(id);
    if (user) {
      await Users.update(id, changes);
      res.status(200).json({ message: 'User Updated' });
    } else {
      res.status(404).json({ errorMessage: 'No User to Updated' });
    }
  } catch {
    res
      .status(500)
      .json({ errorMessage: 'Something is wrong with our Database' });
  }
});

router.get('/id:/posts', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Users.getUserPosts(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ errorMessage: 'No Post to Display' });
    }
  } catch {
    res
      .status(500)
      .json({ errorMessage: 'Something is wrong with our Database' });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' });
    }
  });
}

function validateUser(req, res, next) {
  const body = req.body;

  if (!body || body === {}) {
    res.status(400).json({ message: 'missing user data' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
