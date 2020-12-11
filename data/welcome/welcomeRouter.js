const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
	res.status(200).json({
		message: `Welcome ${process.env.COHORT}`,
		fact: `Deploying node-api3-project for node-api4-project`
	})
})

module.exports = router
