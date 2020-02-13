const express = require("express");

const router = express.Router();

const Data = require("./userDb");

const Posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  Data.insert(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: "To many fields" }));
  console.log(req.users, "USERSSS!!@#!");
  // res.status(200).json(req.users);
});

router.post("/:id/posts", validatePost, (req, res) => {
  // do your magic!
  console.log(req.userpost, "postsss");
  res.status(200).json(req.userpost);
});

router.get("/", (req, res) => {
  // do your magic!
  Data.get()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: "error" }));
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;

  Data.getUserPosts(id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "ERROR" }));
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Data.remove(id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err.message));
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const body = req.body;
  Data.update(id, body)
    .then(post => (!post ? console.log("hello") : res.status(200).json(post)))
    .catch(
      err => console.log(err, "Hello") & res.status(500).json(err.message)
    );
});

//custom middleware
function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  Data.getById(id)
    .then(usersid =>
      usersid
        ? (req.user = usersid) & next()
        : res.status(401).json({ error: "Not a Valid ID" })
    )
    .catch(err => res.status(500).json({ error: "no ID" }));
}

function validateUser(req, res, next) {
  // do your magic!

  req.body && req.body.name
    ? next()
    : !req.body.name
    ? res.status(500).json({ error: "needs to have name" })
    : res.status(500).json({ Error: "needs to have body" });
}

function validatePost(req, res, next) {
  // do your magic!
  const { id } = req.params;
  const user = { ...req.body, user_id: id };
  Posts.insert(user)
    .then(users =>
      !users & console.log(users)
        ? res.status(400).json({ error: "no user" })
        : !req.body.text
        ? res.status(400).json({ message: "missing post data" })
        : (req.userpost = users) & console.log(users, "TEST") & next()
    )
    .catch(err =>
      !req.body.text & console.log(err)
        ? res.status(500).json({ error: "yesss" })
        : res.status(500).json({ error: "noo" })
    );
}

module.exports = router;
