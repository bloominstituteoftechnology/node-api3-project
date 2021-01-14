// require your server and start it
const server = require('./api/server');
const { logger } = require('./api/middleware/middleware');

const port = 5000;

server.listen(port, logger, () => {
    console.log(`Listening on port ${port}`);
})