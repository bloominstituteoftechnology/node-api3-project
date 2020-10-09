module.exports = (format) => {
    return(req, res, next) => {
        switch(format) {
            case "short":
                console.log(`${req.method} ${req.url}`)
                break
            case "long":
                const time = new Date().toISOString()
                console.log(`$[{time}] ${req.ip} ${req.method} ${req.url}`)
        }
        next()
    }
}