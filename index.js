// require your server and launch it
const server = require('./api/server.js');

server.listen(3000, () => {
    console.log('\n **** Server Running on http://localhost:3000 **** \n');
});
