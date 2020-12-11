const express = require('express');
// const posts = require("./postDb");

const router = express.Router();

// router.get('/posts', (req, res) => {
//   posts.get()
//     .then((posts) => {
//       res.status(200).json(posts);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         Message: "Post Not found"
//       })
//   })
// });

// router.get('/:id', (req, res) => {
//   // do your magic!
// });

// router.delete('/:id', (req, res) => {
//   // do your magic!
// });

// router.put('/:id', (req, res) => {
//   // do your magic!
// });

// // custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
