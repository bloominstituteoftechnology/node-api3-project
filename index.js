// code away!
const server = require('./server');

const PORT = 4005

server.listen(PORT, () => {
    console.log(`** Server Running on http://localhost:${PORT}**`)
})