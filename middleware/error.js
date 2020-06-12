// this is considered error middleware since it has four parameters
module.exports = () => {
  return (err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      message: 'something went wrong, please try again later',
    })
  }
}
