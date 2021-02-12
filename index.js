// require your server and launch it
require("dotenv").config();
const server = require('./api/server');


// const PORT = process.env.PORT || 9000;

// server.listen(PORT, () => {
//     console.log(`\n* Server Running on ${PORT} *\n`);
// });

server.listen(process.env.PORT || 5000);