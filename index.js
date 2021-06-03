require('dotenv').config();
// require your server and launch it
const server  = require('./api/server')

const port = process.env.PORT


// START YOUR SERVER HERE
server.listen(port,()=>{
    console.log('listening on', port);
})