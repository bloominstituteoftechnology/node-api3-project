// require your server and launch it
const server = require("./api/server");

const PORT = 5000;

server.listen(PORT, () => {
  console.log("\n*** Server running on http://localhost:5000 ***\n");
});
