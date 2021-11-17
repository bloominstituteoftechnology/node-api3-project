// require your server and launch it
const { response } = require('./api/server');
const server = require('./api/server');

const PORT = 4000;

// START YOUR SERVER HERE
server.get('/', (req, res) => {
    response.status(200).json()
})
server.listen(PORT, () => {
    console.log('server is running on 4000')
})