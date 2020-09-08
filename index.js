// code away!
const server = require('./server');

const port = 5000;

server.listen(5000, () => {
	console.log(`Server running on port ${port}`);
});
