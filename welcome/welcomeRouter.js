const express = require('express');

const welcomeRouter = express.Router();

welcomeRouter.get('/', async (req, res, next) => {
	res.status(200).json({ message: process.env.MESSAGE || 'Welcome to the APP' });
});

welcomeRouter.get('/api', (req, res, next) => {
	res.status(200).json({ message: process.env.API_MESSAGE || 'This is the API homepage' });
});

module.exports = welcomeRouter;
