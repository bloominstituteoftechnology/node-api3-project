const express = require('express');
const User = require('./userDb'); 


const router = express.Router();

//custom middleware ---------------------------
 const validateUserId = async (req, res, next) => {
  const { id } = req.params; 
  try {
    const user = await User.getById(id); 
    if (!user) { 
      res.status(404).json({ message: `User with id of ${id} not found`});
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

//JUICY ENPOINTS ---------------------------------
router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', async (req, res) => {
  try { 
    const users = await User.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  const { id } = req.params;

  try { 
    const user = await User.getById(id); 
    res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});



module.exports = router;