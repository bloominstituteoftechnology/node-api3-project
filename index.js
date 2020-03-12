// code away!
server = require('./server.js');

const port = 5000;
server.listen(port, () => {
    console.log('Server listening on localhost:${port}');
})