const express = require("express");

//databases
const db = require("./userDb");
const postDb = require("../posts/postDb");


//middlewares 
const validateUserId = require("../middleware/validateUserId");
const validateUser = require('../middleware/validateUser'); 
const validatePost = require('../middleware/validatePost'); 



const router = express.Router();

router.post("/register", validateUser,  async (req, res) => {
  try {
    
    const newUser = { name: req.name };

    await db.insert(newUser);
    return res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/:id/posts", [validateUserId, validatePost],  async (req, res) => {
  // have access to current user as req.user;

  try {
  
    const newPost = { text: req.text, user_id: req.user.id }; 

    await postDb.insert(newPost); 
    return res.status(201).send(newPost); 

  
  } catch (e) {
    res.status(500).send(e); 
  }
});

router.get("/users", (req, res) => {
  res.send({users: "Cristian"})
});

router.get("/:id", validateUserId, async (req, res) => {
  // do your magic!
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId, async (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserId, async (req, res) => {
  // do your magic!
});


module.exports = router;
