const User = require('./users/userDb'); 
const Post = require('./posts/postDb'); 

// USER MIDDLEWARE _)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)
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
  };
  
  const validateUser = (req, res, next) => {
    //Think about what body looks like when we declare it like so
    const { body } = req; 
    if (!body.name) {
      res.status(400).json({ message: "missing user data"}); 
    } else if (body.name.length < 2) {
      res.status(400).json({ message: "name must be at least 2 characters long"}); 
    } else { 
      next();
    }
  };

  //POST MIDDLEWARE _)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)_)

  const validatePostId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await Post.getById(id); 
      if (!post) { 
        res.status(404).json({ message: `post with id of ${id} not found`});
      } else {
        req.post = post;
        next();
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving post' });
    }
  }

  const validatePost = (req, res, next) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ message: "missing post data" })
    } 
    next();
  }

  module.exports = {
      validateUser, 
      validateUserId, 
      validatePostId, 
      validatePost
  }