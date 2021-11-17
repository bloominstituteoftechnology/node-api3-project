// require your server and launch it
const server = require('./api/server.js');

server.listen(4000, () => {
    console.log('Server Running On localhost:4000');
})