const express = require("express");
const postDb = require("./postDb");
const router = express.Router();

//--------------------------
// GET posts
//--------------------------

router.get("/", (req, res) => {
  postDb.get(req.body).then((post) => {
    res.status(200).json(post);
  });
});

//--------------------------
// GET post By ID
//--------------------------

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(post);
});

//--------------------------
// DELETE post
//--------------------------

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  postDb.remove(req.params.id).then((deleted) => {
    if (!deleted) {
      res.status(404).json({
        message: `no post with id # ${id} was found`,
      });
    } else {
      res.status(200).json({
        message: "post deleted",
      });
    }
    next();
  });
});

//--------------------------
// UPDATE post
//--------------------------

router.put("/:id", (req, res) => {
  postDb.update(req.params.id, req.body).then((post) => {
    res.status(200).json(post);
  });
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  postDb.getById(req.params.id).then((post) => {
    if (!post) {
      req.status(404).json({
        message: `no post with id # ${id} was found`,
      });
    } else {
      next();
    }
  });
}

module.exports = router;

/* postDb.getById(req.params.id).then((post) => {
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({
      message: "post not found",
    });
  }
});  */
