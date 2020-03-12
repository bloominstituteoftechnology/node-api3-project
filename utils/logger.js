module.exports = {
  logger
};

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);

  next();
}
