function logger(req, res, next) {
    const {method, originalUrl} = req;
    console.log(`${method} to ${originalUrl}`)

    next();
}

module.exports = logger