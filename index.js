// require your server and start it
const server = require('./api/server.js');

server.listen(5000, () => {
    console.log('Server running on port 5000.')
});