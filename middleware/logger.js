module.exports = function (req, res, next) {
    console.log(`method = ${req.method}`); 
    console.log(`request URL = ${req.url}`); 
    console.log(`timestamp = ${Date.now()}`); 
    next(); 
}


