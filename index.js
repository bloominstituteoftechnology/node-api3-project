// require your server and launch it
const server = require('./api/server');

server.listen(process.env.PORT || 4000, () => {
    console.log(`\n*** Server is running on port 4000 ***\n`);
})



