module.exports = () => (req, res, next) =>{
    console.log(`${req.method} ${req.url} ${Date.now()}`)
    next()
}