const server = require("./server");

const port = 8080;
server.listen(port, () =>{
    console.log('server running on port ${port}...');
    
})
