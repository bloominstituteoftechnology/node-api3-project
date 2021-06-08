// require your server and launch it
const server = require('./api/server')
const port = `\n* http://localhost:5000*\n`

server.listen(port, () => {
    console.log(`server running on ${port}`);
});


