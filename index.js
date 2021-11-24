// require your server and launch it
const server = require('./api/server')
require('colors')

const port = 8000

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.cyan);
})