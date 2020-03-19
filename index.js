// code away!
const app = require("./server.js")
const port = 5000;

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
})