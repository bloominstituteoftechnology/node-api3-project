const server = require('./server')
const PORT = 5000

server.listen(PORT, () => { console.log(`[API SERVER LOG]: Server is listening on http://localhost:${PORT}`) })