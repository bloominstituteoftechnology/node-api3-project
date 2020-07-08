// code away!

const server = require("./server.js");

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`\n* Server Running on http://localhost:${PORT} *\n`);
});