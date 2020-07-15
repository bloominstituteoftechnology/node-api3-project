// code away!
const server = require('./server');

const PORT = 4111;

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
