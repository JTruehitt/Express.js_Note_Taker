const express = require('express')
const router = express.Router()

// setting up base middleware
router.use((req, res, next) => {
    console.log('yay for middleware')
    next()
})

// landing page route
router.get('/', (req, res) => {
    res.render('./public/index.html')
})

// notes route
router.get('/notes', (req, res) => {
    res.render('./public/notes.html')
})

module.exports = router