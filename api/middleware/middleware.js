const users = require('../users/users-model.js');
const posts = require('../posts/posts-model');

// logs to the console the following information about each request: request method, request url, and a timestamp
//   - this middleware runs on every request made to the API
const logger = (req, res, next) => {
    console.log(req.url);
    next();
  }
//TESTED IN POSTMAN - SUCCESS

  // all user endpoints that include an `id` parameter in the url
  //  (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id.
const validateUserId = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const user = await users.getById(userId);
        if(!user){
          res.status(404).json(`No user with this ${userId}`);
        }else{
          req.user = user;
          next();
        }

    }catch(error){
      res.status(500).json({message: 'Error'})
    }
  
}


// `validateUser` validates the `body` on a request to create or update a user
//   - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`
const validateUser = (req, res, next) => {
  const newUser = req.body
  if(!newUser.name){
    res.status(400).json({message: 'missing required name field'})
  }else{
    next();
  }
}


// - `validatePost` validates the `body` on a request to create a new post
//   - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`
const validatePost = (req, res, next) => {
  const newPost = req.body
  if(newPost.query && newPost.query.text && newPost.query.text === ""){
    res.status(400).json({message: 'missing text field'});
  }else{
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}