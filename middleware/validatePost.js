const posts = require("../posts/postDb");

module.exports = () => {
  return (req, res, next) => {
    //validates the `body` on a request to create a new post
    !req.body //if the request `body` is missing, cancel the request and respond with status `400`
      ? res.status(400).json({ message: "missing post data" })
      : !req.body.text //if the request `body` is missing the required `text` field, cancel the request and respond with status `400`
      ? res.status(400).json({
          message: "missing required text field",
        })
      : req.body;
    next();
  };
};
