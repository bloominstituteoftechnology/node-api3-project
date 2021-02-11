// require your server and launch it
const server = require('./api/server');
const PORT = 9999

server.listen(PORT, () => {
    console.log(`Port: ${PORT} is currently running!`)
})
