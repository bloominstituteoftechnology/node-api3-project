module.exports = (format) => {
    return (req, res, next) => {
                const time = new Date().toISOString()
                console.log(`[${time}], ${req.method}, ${req.url}`)

                next()
}};