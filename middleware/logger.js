module.exports = () => {
	return (req, res, next) => {
		const time = new Date();
		console.log(`${time} - ${req.ip} - ${req.method} - ${req.url}`);

		next();
	};
};
