const logger = () => {
  return (req, res, next) => {
    const time = new Date().toISOString();
    console.log(
      ` Time:${time}| IP Address:${req.ip}| HTTP Request Method:${req.method}| Request URL ${req.url}`
    );
    next();
  };
};

const errorHandler = () => {
  return (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong, try again later",
    });
  };
};

module.exports = {
  logger,
  errorHandler,
};
