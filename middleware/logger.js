module.exports = (format) =>{
   return(req,res, next) =>{
   const method = req.method;
   const url = req.url;
   console.log(`[${new Date().toISOString()}]  ${method} ${url} `)
next()}
}