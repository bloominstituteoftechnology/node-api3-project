module.exports = () => {
  return (req, res, next) => {
    const { user } = req.body
    if (!user) {
      return res.status(404).json({
        errorMessage: 'Please provide user data',
      })
    }
    req.user = user
    next()
  }
}
