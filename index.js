// code away!
const server = require('./server')
const port  = process.env.PORT||5000   // made the port assigned by the server(deployment step1)

server.listen(port, ()=>{
console.log(`\n* Server is running on http://localhost:${port} *\n`)
})