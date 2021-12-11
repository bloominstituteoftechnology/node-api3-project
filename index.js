// require your server and launch it
const server = require('./api/server')

const port = 8080

server.listen(port, () => {
    
    console.log('listening on', port)
})