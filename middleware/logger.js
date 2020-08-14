module.exports = () => {
  return (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`${req.method} - ${req.url} - ${time}`);
    next();
  };
};
