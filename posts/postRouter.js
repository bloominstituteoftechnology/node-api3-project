const express = require("express");

const router = express.Router();

const postdb = require("./postDb");

router.get("/", (req, res) => {
  postdb
    .get(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errormessage: "error getting data" });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const id = req.params.id;
  postdb
    .getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
        .end();
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  id = req.params.id;
  postdb
    .remove(id)
    .then((response) => {
      res.status(200).json(`succesfully deleted post ${id}`);
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not retrieve data" });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const id = req.params.id;
  let post = {
    text: req.body.text,
  };
  postdb
    .update(id, post)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The post information could not be modified" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  id = req.params.id;
  var postIds = [];
  postdb.getById().then((response) => {
    response.map((post) => {
      userIds.push(Number(user.id));
    });
    if (!postIds.includes(Number(id))) {
      res.status(404).json({ message: "post with this id does not exist" });
    } else {
      next();
    }
  });
}

module.exports = router;
