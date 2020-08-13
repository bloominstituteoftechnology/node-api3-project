module.exports = function () {
  return (req, res, next) => {
    const method = req.method;
    const url = req.path;
    const timestamp = Date.now();

    console.log(`${method} ${url} ${timestamp}`);

    next();
  };
};

//logs to the console the following information about each request: request method, request url, and a timestamp
//this middleware runs on every request made to the API.
