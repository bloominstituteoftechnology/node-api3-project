const router = require("express").Router();
const Users = require("./users-model.js");
const Posts = require("../posts/posts-router.js")

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
               res.status(201).json(user);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "There was an error while saving the user to the database"})
      })
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
     res.status(200).json(users);
    })
    .catch(error => {
          console.log(error);
      res.status(500).json({
        error: "The users information could not be found."
      });
    });
});

router.get('/:id', validateUser, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
         res.status(200).json(user);
      }
    )
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error:"The user information could not be retrieved."
      });
    });
});

router.delete('/:id', validateUser, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  Users.remove(req.params.id)
  .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The user could not be removed" 
      });
  
  });
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
   .then(user => {
       res.status(200).json(user);
     }
 )
  .catch(error => {
     console.log(error);
     res.status(500).json({
       error: "The user information could not be modified."
     });
   });
});

router.post('/:id/posts', validatePost, (req, res) => {
  const user = {...req.body, user_id: req.params.id};
  Posts.insert(user)
  .then(post => {
          res.status(201).json(post);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "There was an error while saving the post to the database"})
      })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
       res.status(200).json(user);
    }
  )
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error:"The user information could not be retrieved."
    });
  });
});

module.exports = router;
