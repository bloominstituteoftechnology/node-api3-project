const server = require("../server")

function logger(req, res, next) {
    console.log(
        `<------------------------------------->\n[API SERVER LOG]:\n DATE: ${new Date().toISOString()}\n METHOD: ${req.method}\n URL: ${req.url}\n<------------------------------------->`
    )
    
    next()
}

function lockout(res, req, next) {
    res.status(403).json({message: 'The API server is in maintenance mode'})
}

function handleErrors(error, req, res, next) {
    console.log('[SERVER ERROR]: ', error.message)
    const code = error.status || error.statusCode || 400
    res.status(code).json(error)
}


module.exports = {
    logger,
    lockout,
    handleErrors
}