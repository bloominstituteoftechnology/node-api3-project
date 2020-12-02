// code away!
// Import our server 
const server = require('./server'); 

//Set server to listen on our local port of 4000 
server.listen(4000, () => {
    console.log('\n* Server Running on http://localhost:4000 *\n');
});