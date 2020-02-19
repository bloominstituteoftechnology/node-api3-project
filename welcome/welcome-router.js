const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
	res.send(`
		<h1>Lambda Project API</h1>
	`)
})

router.get("/api", (req, res) => {
	res.json({
		message: "Welcome to the API",
	})
})

module.exports = router