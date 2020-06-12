module.exports = format => {
  return (req, res, next) => {
    switch (format) {
      case 'short':
        console.log(`${Date.now()} ${req.method} ${req.url}`)
        break
      case 'long':
      default:
        // give us the date and time without a timezone
        const time = new Date().toISOString()
        //log ou some info about this request
        console.log(`[${time} ${req.ip} ${req.method} ${req.url}]`)
    }
    // move on to the next piece of middleware, we are done here
    next()
  }
}
