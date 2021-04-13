
module.exports = (format) => {
  return (req, res, next) => {
    const time = new Date().toISOString()

    switch (format) {
      case "short":
    console.log(`${req.ip} made a ${req.method}`)
        break
      case "long":
    console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
        break
      default:
        return next("Error: Need a logger format")
    }
  //we are done here, move on to the next phase of middleware
  next()
}
}