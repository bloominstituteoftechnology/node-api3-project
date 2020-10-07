module.exports = (format) => {
  return (req, res, next) => {
    switch(format) {
      case "long":
        const time = new Date().toISOString()
        console.log(`TIME: [${time}] IP: [${req.ip}] METHOD: [${req.method}] URL: [${req.url}]`)
        break
      case "short":
        console.log(`${req.method} ${req.url}`)
    }
    next()
  }
}