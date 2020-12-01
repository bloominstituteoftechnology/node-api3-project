const express = require("express");
const db = require("./userDb");
const validateUser = require("../middleware/validateUser");
const validatePost = require('../middleware/validatePost'); 
const postDb = require("../posts/postDb");
const logger = require('../middleware/logger')

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).send({ error: "Please provide a name" });

    const newUser = { name };

    await db.insert(newUser);
    return res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/:id/posts", [validateUser, validatePost],  async (req, res) => {
  // have access to current user as req.user;

  try {
  
    const newPost = { text: req.text, user_id: req.user.id }; 

    await postDb.insert(newPost); 
    return res.status(201).send(newPost); 

  
  } catch (e) {
    res.status(500).send(e); 
  }
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", validateUser, async (req, res) => {
  // do your magic!
});

router.get("/:id/posts", validateUser, async (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUser, async (req, res) => {
  // do your magic!
});

router.put("/:id", validateUser, async (req, res) => {
  // do your magic!
});


module.exports = router;
