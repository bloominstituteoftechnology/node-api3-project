// require your server and launch it
const server = require("./api/server");

const port = 7000;

server.listen(port, () => {
  console.log(`port listening on port ${port}`);
});
