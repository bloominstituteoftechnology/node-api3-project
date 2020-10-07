const express = require('express');

//!! Why does the then care about what you do inside of it?

const users = require("./userDb");
//unsure if posts should be here. !confused by differnet ids
const posts = require("../posts/postDb")

// const {validateUser} = require("../middleware/validateUser");
const router = express.Router();

//Note, middlewar goes as an input between path and (req, res)
// e.g. ("/", checkUserData(), (req, res)

router.post('/', validateUser, (req, res) => {
  
  
  console.log("req body", req.body);
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json("500 post error");
    })
    
  
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  
  if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for text",
		})
	}

  //!!!Okay this works but I have no idea where it comes from
  posts.insert({text: req.body.text, user_id:req.body.user_id})
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log("error with post");
      res.status(500).json({message: "500 error"})
    } )


});

router.get('/', (req, res) => {
  
  // console.log("User get called", users);
  //Why/when does find/get have parameters? 
  //Also why is it get() in this instance
  users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json("500 post error");
    })
});

router.get('/:id', validateUserId, (req, res) => {
 
  users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json("500 post error")
    })

});

//Returns posts for specific user id
router.get('/:id/posts', validateUserId, (req, res) => {
  
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({message: "500 post error"});
    })
});

//For some reason this only works correctly if else statement is present. Why?
router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
        })
      }
    })
    .catch((error) => {
      res.status(500).json({message: "500 post error"});
    })
});


router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.update(req.params.id, req.body)
		.then((count) => {
      console.log("count", count);
			if (count === 1) {
				res.status(200).json({message: "User edited"})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the user",
			})
		})
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next()
      } else {
        res.status(404).json({
          message: "User not found"
        })
      }
    })
    .catch((error) =>{
      console.log(error);
      res.status(500).json({
        message: "Error retrieving data"
      })
    })
}


function validateUser(req, res, next) {
  // do your magic!
  
  //!!This works, but is it the best way? Were they expecting us to access javascript knowledge here?
  if(Object.keys(req.body).length === 0) {
            res.status(400).json({message: "missing user data"});
        }
   else if (!req.body.name) {
        console.log("validate", req.body);
        res.status(400).json({message: "Missing required name field"});
        }
        next();
}

function validatePost(req, res, next) {
  if(Object.keys(req.body).length === 0) {
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text) {
    res.status(400).json({message: "Missing required text field"});
  }
  next();
}

module.exports = router;
