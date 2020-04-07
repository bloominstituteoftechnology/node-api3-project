const express = require("express");
const postDb = require("./postDb");
const userDb = require("../users/userDb");

const router = express.Router();

//was not included//
router.post("/:id", validateUserId, validatePost, (req, res) => {
  userDb
    .getById(req.params.id)
    .then(
      postDb
        .insert(req.body)
        .then(res.status(200).json(req.body))
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err, "cannot process"));
});

//////////////////

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}
function validatePost(req, res, next) {
  const body = req.body;
  !body || body === {}
    ? res.status(400).json({ message: "post not included" })
    : !body.text
    ? res.status(400).json({ message: "missing text" })
    : next();
}

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  userDb
    .getById(id)
    .then((u) => {
      if (u) {
        req.u = u;
        next();
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

module.exports = router;
