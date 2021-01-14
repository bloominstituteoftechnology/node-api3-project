// require your server and start it
const server = require('./api/server');
const { logger } = require('./api/middleware/middleware');

const port = process.env.PORT;

server.listen(port, logger, () => {
    console.log(`Listening on port ${port}`);
})