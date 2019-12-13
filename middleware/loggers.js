
function logger(req, res, next) {
    console.log(`${req.body} - ${req.params} - ${req.route} - ${req.ip}`)

    next()
}

module.exports = logger