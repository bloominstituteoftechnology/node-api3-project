const express = require("express");
const Db = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  Db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Could not get all post" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  Db.remove(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Could not remove post" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const newpost = req.body;
  console.log("PUT POST REQ", req.body);

  Db.update(id, newpost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: "Post could not be updated" });
    });
});

// router.put("/:id", validatePostId, (req, res) => {
//   // do your magic!
//   const { id } = req.params;
//   const changes = req.body;
//   if (!changes.text) {
//     res.status(400).json({ message: "Need to update the posts text." });
//   } else {
//     Posts.update(id, changes)
//       .then(update => {
//         res.status(200).json(update);
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({ error: "Failed to update Post." });
//       });
//   }
// });

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Db.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ Error: "Could not find Id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ Error: "Couldnt find the post with that Id" });
    });
}

module.exports = router;
