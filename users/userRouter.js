const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

//------------------------------------------------------------------------//
//      Custom MiddleWare
//------------------------------------------------------------------------//

function validateUserId(req, res, next) {
  const numbers = req.url.match(/[0-9]+/)
  if ((req.method === 'GET' || req.method === 'DELETE' || req.method === 'PUT') && numbers) {
    Users.getById(numbers[0])
      .then(user => {
        req.user = user
        if (user) {
          next()
        } else {
          res.status(400).json({ errorMessage: 'invalid user id' });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: 'Unable getting User' })
      })
  } else {
    res.status(400).json({ errorMessage: 'Only numbers 0-9' })
  }
}

function validateUser(req, res, next) {
  const body = req.body;
  if (req.method === 'POST' || req.method === 'PUT') {
    !body.name
      ?
      res.status(400).json({ errorMessage: 'Missing required name.' })
      :

      !Object.keys(body).length
        ? res.status(400).json({ errorMessage: 'Missing user Data' })
        :
        next()
  } else {
    next();
  }
}



router.use(validateUser)


//------------------------------------------------------------------------//
//      POST new User
//------------------------------------------------------------------------//
router.post('/', async (req, res) => {
  try {
    await Users.insert(req.body);
    res.status(201).json({ message: 'New User added' });
  } catch {
    res.status(500).json({ errorMessage: 'Error Posting new User' });
  }
});
//------------------------------------------------------------------------//
//      GET * Users
//------------------------------------------------------------------------//
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
//------------------------------------------------------------------------//
//      GET User by ID
//------------------------------------------------------------------------//
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

//------------------------------------------------------------------------//
//      DELETE User by ID
//------------------------------------------------------------------------//
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
//------------------------------------------------------------------------//
//      EDIT User by ID
//------------------------------------------------------------------------//

router.put('/:id', validateUserId, async (req, res) => {
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
//------------------------------------------------------------------------//
//      GET Post by ID of User
//------------------------------------------------------------------------//

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: `No Post for User ${post}` })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not retrieve posts from user", err })
    })
});

module.exports = router;
