const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

router.use((req, res, next) => {
  next();
});

// main /api page
router.get("/", (req, res) => {
  res.send(console.log("yay"));
});

// api/notes page
router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db", "db.json"), "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("error loading saved notes");
    }
    res.send(data);
  });
});

router.post("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db", "db.json"), "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("error loading saved notes");
    }

    let db = [];
    if (data) {
      db = JSON.parse(data);
    }

    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    console.log("new note: ", newNote);
    console.log("req body: ", req.body);
    db.push(newNote);
    fs.writeFile(
      path.join(__dirname, "../db", "db.json"),
      JSON.stringify(db),
      (err) => console.error(err)
    );
    res.send(console.log("Note saved"));
  });
});

router.delete(`/notes/:id`, (req, res) => {
  console.log('hello')
  fs.readFile(path.join(__dirname, "../db", "db.json"), "utf8", (err, data) => {
    if (err) res.status(500).send("error loading saved notes");

    let db = [];
    if (data) db = JSON.parse(data);
    console.log(db)

    const { id } = req.params;
    db.forEach(note => {
      if (note.id === id) {
        let index = db.indexOf(note)
        db.splice(index, 1)
      }
  })

  fs.writeFile(
    path.join(__dirname, "../db", "db.json"),
    JSON.stringify(db),
    (err) => console.error(err)
  );
  res.send(console.log("Note deleted"));
  });
});

module.exports = router;
