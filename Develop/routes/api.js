const express = require("express");
const router = express.Router();
const fs = require('fs')
const path = require('path')

router.use((req, res, next) => {
  console.log("API router accessed.");
  next();
});

// main /api page
router.get('/', (req, res) => {
  res.send(console.log('yay'))
})

// api/notes page
router.get('/notes', (req, res) => {
  res.send(console.log('yay notes'))
})

router.post('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db', 'db.json'), "utf8", (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('error reading new note')
    }
  const db = JSON.parse(data)
  const newNote = {
    id: 8,
    title: req.body.title,
    test: req.body.text
  }
  console.log('req body: ', req.body)
  db.push(newNote)
  fs.writeFile(path.join(__dirname, '../db', 'db.json'), JSON.stringify(db), err => console.error(err) )
  res.send(console.log("Note saved"))
})})

module.exports = router