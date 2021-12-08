const server = require("./api/server");

const port = 8500
// require your server and launch it
server.listen(port, () => {
    console.log(`listening on port:${port}`)
})