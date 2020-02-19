module.exports = () => {
    return(req, res, next) => {
        const {ip, method, url, agent } = req
        console.log(`ip: ${ip}, method: ${method}, url: ${url}, agent: ${agent}`)
        next ()
        
    }  
}