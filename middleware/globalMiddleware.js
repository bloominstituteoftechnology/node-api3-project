module.exports = () => {
  return (req, res, next) => {
    const time = new Date().toISOString();
    console.log(
      ` Time:${time}| IP Address:${req.ip}| HTTP Request Method:${req.method}| Request URL ${req.url}`
    );
    next();
  };
};
