// code away!
const server = require('./server');
const port = 8080;
server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
