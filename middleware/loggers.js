
function logger(req, res, next) {
    console.log(`${req.method} - ${req.originalUrl} - ${req.ip} - ${req.body}`)

    next()
}

module.exports = logger