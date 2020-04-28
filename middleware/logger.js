module.exports = function () {
  return (req, res, next) => {
    const method = req.method;
    const url = req.path;
    const timestamp = Date.now();

    console.log(`${method} ${url} ${timestamp}`);

    next();
  };
};
