// code away!

require('dotenv').config();

const server = require('./server');

const port = process.env.PORT;
server.listen(post, () => {
    console.log(`Server running on port ${post}`)
})