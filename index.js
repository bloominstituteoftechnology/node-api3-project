// require your server and launch it
const server = require("./api/server");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Port: ${PORT} is currently running!`);
});
