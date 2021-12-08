// require your server and launch it
console.log('Hello World!')
 const server = require('./api/server')
 const PORT = 5000
 server.listen(PORT, () => {
     console.log('listening on' , PORT)
 })