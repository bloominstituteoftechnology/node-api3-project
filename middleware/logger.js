//export a HOC, fn that returns a fn, middlewear fn itsself
module.exports = (format) => {
    return (req, res, next) =>{
      switch (format) {
        case "short":
          console.log(`${req.method} ${req.url}`);
          break
          case "long":
              const time = new Date().toISOString();
              console.log(`${time} ${req.ip} ${req.method} ${req.url}`)
              break
      }
  
      //tells middlewear to stop and  move to next middlewear
      next();
    }
  }
  // server.use(morgan("combined"))
  //mimick morgan library
  