const express = require('express');
const User = require('./userDb'); 
const middlewares = require('../middlewares');

const router = express.Router();

//custom middleware ---------------------------




//JUICY ENPOINTS ---------------------------------
router.post('/', middlewares.validateUser, async (req, res) => {
  try { 
    const user = await User.insert(req.body);
    res.status(200).json(user);  
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

router.post('/:id/posts', (req, res) => {
  
});

router.get('/', async (req, res) => {
  try { 
    const users = await User.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

router.get('/:id', middlewares.validateUserId, (req, res) => {
  res.status(200).json(req.user); 
});

router.get('/:id/posts', middlewares.validateUserId, async (req, res) => {
  const { id } = req.params; 
  try { 
    const posts = await User.getUserPosts(id); 
    res.status(200).json(posts); 
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

router.delete('/:id', middlewares.validateUserId, async (req, res) => {
  const { id } = req.params; 
  try { 
    const deleted = await User.remove(id); 
    res.status(200).json(deleted);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});

router.put('/:id', middlewares.validateUserId, async (req, res) => {
  const { id } = req.params; 
  try { 
    const updated = await User.update(id, req.body); 
    res.status(200).json(updated); 
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
});



module.exports = router;