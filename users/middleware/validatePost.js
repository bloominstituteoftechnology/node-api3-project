module.exports = function validatePost(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "missing post data"
    })
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next();
  }
}
