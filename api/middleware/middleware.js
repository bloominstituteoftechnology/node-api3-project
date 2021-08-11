function logger(req, res, next) {
  console.log(`Loggin successful`);
  next();
}

function validateUserId(req, res, next) {
  console.log("User ID validated");
  next();
}

function validateUser(req, res, next) {
  console.log("User validated");
  next();
}

function validatePost(req, res, next) {
  console.log("Posted");
  next();
}

module.exports = logger;

// do not forget to expose these functions to other modules
