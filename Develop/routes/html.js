const express = require('express')
const router = express.Router()
const path = require('path')

// setting up base middleware
router.use((req, res, next) => {
    next()
})

// main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})
// /notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'notes.html'))
})

module.exports = router