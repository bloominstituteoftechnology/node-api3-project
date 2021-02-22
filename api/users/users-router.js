const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  userdb
        .get()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log("User Get Error: ", err);
            res.status(500).json({ error: "Users could not be retrived" });
        });
});

router.get('/:id', (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
    // do your magic!
    userdb
        .getUserPosts(req.params.id)
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.log("get user post err:", err);
            res.status(500).json({ errmessage: "Posts Could Not Be Retrived" });
        });
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  userdb
  .insert(req.body)
  .then(user => {
      res.status(201).json(user);
  })
  .catch(err => {
      console.log("Add User Error:", err);
      res.status(500).json({
          errmessage: "There was an error creating a user."
      });
  });
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const userId = req.params.id;

    userdb
        .update(userId, req.body)
        .then(() => {
          res.status(200).json({
              message: "User has been updated."
            });
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).json({
                message: "There was a problem updating user ."
            });
        });
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  userdb
  .remove(req.params.id)
  .then(user =>
      res.status(200).json({ message: `User has been deleted` })
  )
  .catch(err => {
      console.log("Delete User Error:", err);
      res.status(500).json({ errmessage: "User Could not be deleted" });
  });
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  userdb
  .getUserPosts(req.params.id)
  .then(posts => res.status(200).json(posts))
  .catch(err => {
      console.log("get user post err:", err);
      res.status(500).json({ errmessage: "Posts Could Not Be Retrived" });
  });
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  
  const userId = req.params.id;
  const post = { ...req.body, user_id: userId };
  // do your magic!
  postdb
      .insert(post)
      .then(user => {
          res.status(201).json(user);
      })
      .catch(err => {
          console.log("Create User Post Error:", err);
          res.status(500).json({
              errmessage: "There was an error creating a post."
          });
      });
});

// do not forget to export the router
