// require your server and launch it
const server = require('./api/server.js')

const { logger } = require('./api/middleware/middleware.js')

server.use(logger)

const port = 5000

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})