module.exports = () => {
    return (req, res, next) => {
        const agent = req.headers['user-agent']
        if (/insomnia/.test(agent)) {
            return res.status(418).json({
                message: 'No Insomnia allowed here',
            })
        }
        next()
    }
}