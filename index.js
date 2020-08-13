// code away!
const { server, port } = require("./server");

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
