const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  Posts.get()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: "error" }));
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.userposts);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Posts.remove(id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err.message));
});

router.put("/:id", validatePostId, validateUserpost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const body = req.body;
  Posts.update(id, body)
    .then(post => (!post ? console.log("hello") : res.status(200).json(post)))
    .catch(
      err => console.log(err, "Hello") & res.status(500).json(err.message)
    );
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Posts.getById(id)
    .then(userspost =>
      userspost
        ? (req.userposts = userspost) & next()
        : res.status(401).json({ error: "Not a Valid ID" })
    )
    .catch(err => res.status(500).json({ error: "no ID" }));
}

function validateUserpost(req, res, next) {
  // do your magic!

  req.body && req.body.text
    ? next()
    : !req.body.length
    ? res.status(500).json({ error: "needs to have name" })
    : res.status(500).json({ Error: "needs to have body" }) &
      console.log(req.body.length, "text");
}

module.exports = router;
