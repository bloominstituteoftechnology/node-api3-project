const express = require("express");
const db = require("./userDb");
const post = require("../posts/postDb");


const router = express.Router();
router.use(express.json());

router.post("/", validateUser, (req, res) => {
  const { name } = req.body;
  const newUser = { name };

  db.insert(newUser)
    .then(newuser => {
      res.status(201).json(newuser);
    })
    .catch(error => {
      console.log(error);
    });
}); // working

router.post("/:id/posts", validatePost,validateUserId, (req, res) => {
  const comment = {
    ...req.body,
    user_id: req.user.id
  }	  
  post.insert(comment)
    .then(newcomment => {
      res.status(201).json(newcomment);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
}); //working

router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
    });
}); //working

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
    });
}); // working

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
    });
}); //working

router.delete("/:id", validateUserId, (req, res) => {
  db.remove(req.params.id)
    .then(removed => {
      res.status(200).json(removed);
    })
    .catch(error => {
      console.log(error);
    });
}); //working

router.put("/:id", validateUser, validateUserId, (req, res) => {
  const { name } = req.body;
  const edit = { name };

  db.update(req.params.id, edit)
    .then(edit => {
      res.status(200).json(edit);
    })
    .catch(error => {
      console.log(error);
    });
}); //working

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  db.getById(id).then(user => {
    if (!user) {
      res.status(404).json({ message: "invalid user id" });
    } else {
      req.user = user;
      next();
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;