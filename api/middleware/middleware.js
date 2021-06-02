// - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
//   - this middleware runs on every request made to the API
function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`time: ${timestamp}, method: ${method}, URL: ${url} `);
  next();
}

function validateUserId(req, res, next) {
  console.log("validateUserId middleware");
  next();
}

function validateUser(req, res, next) {
  console.log("validateUser middleware");
  next();
}

function validatePost(req, res, next) {
  console.log("validatePost middleware");
  next();
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
