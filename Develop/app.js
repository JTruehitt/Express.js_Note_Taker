const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000

const htmlRouter = require('./routes/html')
const apiRouter = require('./routes/api')


app.use(express.urlencoded({ extended: false}))
app.use('/', htmlRouter);
app.use('/api', apiRouter)
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})