const User = require("../users/users-model");

// - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
//   - this middleware runs on every request made to the API
function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`time: ${timestamp}, method: ${method}, URL: ${url} `);
  next();
}

// //- this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should CHECK THE DATABASE(async) to make sure there is a user with that id.
// - if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
// - if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`
// make it a async function because its going to be interacting with the database
async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "no such user" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "problem finding user" });
  }
}

// - `validateUser` validates the `body` on a request to create or update a user
//   - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`
function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "name required" });
  } else {
    req.name = name;
    next();
  }
}

// - `validatePost` validates the `body` on a request to create a new post
// - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`
function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    req.text = text;
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
