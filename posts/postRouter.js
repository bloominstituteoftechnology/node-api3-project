const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ message: "Can not find data" });
    });
}); // working

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error, message: "Can not get user" });
    });
}); // working

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The User has been deleted" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "error removing user",
      });
    });
}); // working

router.put("/:id", (req, res) => {
  const { id } = req.params;
  db.update(id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error, message: "Could not edit user" });
    });
}); // not yet!!!

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
