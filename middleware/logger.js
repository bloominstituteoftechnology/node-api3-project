const logger = (req, res, next) => {
  const reqMethod = req.method;
  const reqURL = req.url;

  console.log(`A ${reqMethod} request was made to '${reqURL}' route`);

  next();
};

module.exports = logger;
