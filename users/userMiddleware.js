// const users = require("./userDb");

// function validateUserId() {
//     return (req, res, next) => {
//         users.getById(req.params.id)
//             .then((user) => {
//                 if (user) {
//                     req.user = user;
//                     next();
//                 } else {
//                     res.status(404).json({
//                         Message: "Invalid User ID"
//                     })
//             }
//             })
//             .catch((error) => {
//                 next(error);
//         })
//     }
// }

// module.exports = {
//     validateUserId,
// }