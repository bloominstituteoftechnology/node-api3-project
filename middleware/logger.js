module.exports = () =>{
    return (req,res, next)=>{
        const date = new Date().toISOString();
        console.log(`${date} --> ${req.ip} --> ${req.method} --> ${req.url} --> ${req.headers['user-agent']}`)
        next()
    }
}