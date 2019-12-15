

module.exports = () => (req, res, next) => {
    
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('User-Agent')}`
    );
 
    next()
    
  }

