

module.exports = function logger(req, res, next) {
    console.log(req);
    const method = req.method;
    const endpoint = req.originalUrl;
    const time = Date();
    console.log(`${method} to '${endpoint}', timestamp: ${time}`);
  next();
}