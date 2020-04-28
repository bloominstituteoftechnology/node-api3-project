// code away!
const { server, port } = require("./server");

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
