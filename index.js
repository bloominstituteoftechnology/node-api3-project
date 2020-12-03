// code away!
// Import our server 
const dotenv = require('dotenv');
dotenv.config();

const server = require('./server'); 

const port = process.env.PORT || 4000;

//Set server to listen on our local port of 4000 
server.listen(port, () => {
    console.log(`\n* Listening on ${port} *\n`);
});