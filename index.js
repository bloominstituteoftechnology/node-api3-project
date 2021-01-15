require('dotenv').config();
const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;

server.listen(5000, () => {
    console.log(`Server running on port ${PORT}.`)
});