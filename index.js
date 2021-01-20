// require your server and start it
const server=require('./api/server');

const PORT=4000;
server.listen(PORT,()=>{
    console.log(`Server up at port ${PORT}`)
})