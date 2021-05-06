// require your server and launch it
const server = require('./api/server');

const port = 1234;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log(`running on port: ${port}`)
})
module.exports = server