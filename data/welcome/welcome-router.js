const express = require("expres")

const router = express.Router()
router.get("/", (req, res) => {
    res.json({
        message: "Welcome to our API",
    })
})

module.eports = router