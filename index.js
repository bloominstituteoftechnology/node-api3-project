// require your server and launch it
const server = require("./api/server.js")
const dotenv = require("dotenv").config();
const port = process.env.PORT || 9000

server.listen(port, ()=>{
    console.log(`Running on ${port} at ${__dirname}`)
})