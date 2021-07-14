// require your server and launch it
const server = require("./api/server");

server.listen(5001, () => {
  console.log("\n*** Server running on http://localhost:5001 ***\n");
});
