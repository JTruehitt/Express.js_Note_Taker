const express = require('express')
const router = require('./router')

const app = express()

const port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('./public/index.html')
})

app.get('/notes', (req, res) => {
    res.render('./public/notes.html')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})