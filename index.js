// require your server and launch it
const server = require('./api/server.js')

const port = 5000;

server.listen(port, () => {
    console.log('Server is up and running on port 5000')
})