const express = require("express")

const router = express.Router()

router.get("/", (req,res) => {
    res.status(200).json({
        message :`Let's write some middleware class ${process.env.COHORT}!`
    })
})

module.exports = router