const server = require('./server')

require('colors')

server.listen(7777, ()=>{
    console.log('\n\t *** server running on port 7777 ***'.green.inverse)
})