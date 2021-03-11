const server = require('./api/server')
const morgan = require('morgan')
const logger = require('./middleware/logger')
const userRouter = require('./users/userRouter')

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())
server.use(morgan('combined'))
server.use(logger('long'))
server.use(userRouter)

server.listen(port, () => {
    console.log(`listening on port ${port} , running at http://localhost:${port}`)
})