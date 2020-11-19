const express = require("express");

const router = express.Router();

const user = require("./userDb");

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  user.getById(id).then((data) => {
    if (data) {
      next();
    } else {
      next({ code: 400, error: "That user id does not exist" });
    }
  });
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    next({ code: 400, error: "missing user data" });
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const { text, user_id } = req.body;
  if (!text && !user_id) {
    next({ code: 400, error: "please provide a name and a user_id" });
  } else {
    next();
  }
}

router.post("/", validateUser, (req, res) => {
  const name = req.body;
  user.insert(name).then();
});

router.post("/:id/posts", validateUser, validatePost, (req, res) => {
  // do your magic!
});

router.get("/", (req, res, next) => {
  user
    .get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next("there was an error");
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  user.getById(id).then((data) => {
    res.status(200).json(data);
  });
});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, validateUser, (req, res) => {});

router.use((err, req, res, next) => {
  // const { err.code, err.message }
  res.status(`${err.code}`).json({ message: `${err.error}` });
});

module.exports = router;
