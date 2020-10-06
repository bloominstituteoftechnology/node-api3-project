//In the example the structure was wrapped in an export. I think so that it could return the function itself so users could input parameters. Trying a simpler version

//Donewithotu reference, probalby entirely wrong.
function logger(req, res, next) {
    // console.log("Logger works");
    //!!Why does assigning time to a variable not work?
    // const time = new Date().toISOString;
    //!!Why does time need to be in brackets?
    console.log(`Called ${req.method} to ${req.url} at [${new Date().toISOString()}]`);
    
    next();
}


module.exports = logger;