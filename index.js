// require your server and launch it
const server = require('./api/server')

require('colors')

const port = 9000

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}) 