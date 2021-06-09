// require your server
const server = require('./api/server');

// launch server
const port = 4000

server.listen(port, () => { 
  console.log(`* Server Running on http://localhost:${port}*`);
});