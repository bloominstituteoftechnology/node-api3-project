// const express = require("express");

// const posts = require("../data/seeds/03-posts");

// const router = express.Router();

// router.get("/", validatePostId(), (req, res) => {
//   const options = {
//     sortBy: req.query.sortBy,
//     limit: req.query.limit
//   };

//   users
//     .find(options)
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(error => {
//       next(error);
//     });
// });

// router.get("/:id", validatePostId(), (req, res) => {
//   res.status(200).json(req.posts);
// });

// router.delete("/:id", validatePostId(), (req, res) => {
//   posts
//     .remove(req.params.user_id)
//     .then(count => {
//       if (count > 0) {
//         res.status(200).json({
//           message: "The post has been nuked"
//         });
//       } else {
//         res.status(404).json({
//           message: "The post could not be found"
//         });
//       }
//     })
//     .catch(next);
// });

// router.put("/:id", validatePostId(), (req, res) => {
//   if (!req.body.user_id || !req.body.text) {
//     return res.status(400).json({
//       message: "Please provide title and contents for the post."
//     });
//   }

//   posts
//     .update(req.params.id, req.body)
//     .then(post => {
//       if (post) {
//         res.status(200).json(post);
//       } else {
//         res.status(404).json({
//           message: "This post cannot be updated"
//         });
//       }
//     })
//     .catch(next);
// });

// // custom middleware

// function validatePostId() {
//   return (req, res, next) => {
//     posts
//       .getById(req.params.user_id)
//       .then(post => {
//         if (post) {
//           req.user_id = post;
//           next();
//         } else {
//           res.status(404).json({
//             message: "Post not found"
//           });
//         }
//       })
//       .catch(next);
//   };
// }

// module.exports = router;
