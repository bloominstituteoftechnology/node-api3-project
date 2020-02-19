const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send(`
		<h1>Middleware API</h1>
		<p>Checkout the Middleware API</p>
	`);
});

router.get('/api', (req, res) => {
	res.json({
		message: 'You have entered the API'
	});
});

module.exports = router;
