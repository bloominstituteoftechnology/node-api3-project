
module.exports = function logger(req, res, next) {
  // console.log(req);
  const method = req.method;
  const endpoint = req.originalURL;
  const time = Date();
  console.log(`${method} to ${endpoint} at timestamp: ${time}`);

  next();
}
