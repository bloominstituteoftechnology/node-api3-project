const express = require('express');


const users = require("./userDb");
//unsure if posts should be here. !confused by differnet ids
const posts = require("../posts/postDb")

// const {validateUser} = require("../middleware/validateUser");
const router = express.Router();

//Note, middlewar goes as an input between path and (req, res)
// e.g. ("/", checkUserData(), (req, res)

router.post('/', validateUser, (req, res) => {
  // do your magic!
  console.log("req body", req.body);
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    // .catch((error) => {
    //   res.status(500).json("500 post error");
    // })
    //!!!Where is it getting next? Is validateUser returning it?
    .catch(next)
  
});

//!!! Doesn't work, doing get first
//'users/:id/posts'
//insert for posts doesn't seem to have a place for user id?
router.post('/:id/posts', (req, res) => {
  // do your magic!
  posts.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log("error with post");
    } )


});

router.get('/', (req, res) => {
  // do your magic!
  // console.log("User get called", users);
  //Why/when does find have parameters? Also why is it get() in this instance
  users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json("500 post error");
    })
});

router.get('/:id', (req, res) => {
  // do your magic!
  users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res.status(500).json("500 post error")
    })

});

//!This returns all posts regardless of user id. I don't know if that's correct. Cant' tell when it wants user id and when it wants post id in general
//Get by id does post id not user id
//But instrutiors say "list of posts FOR a user"
router.get('/:id/posts', (req, res) => {
  // do your magic!
  posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({message: "500 post error"});
    })
});

//For some reason this only works correctly if else statement is present. Why?
router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
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
  // do your magic!
}

module.exports = router;
