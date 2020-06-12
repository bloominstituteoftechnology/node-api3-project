const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to API node project 3',
  })
})

module.exports = router
