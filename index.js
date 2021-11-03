// require your server and launch it
const server = require('./api/server')

const port = 8000

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})