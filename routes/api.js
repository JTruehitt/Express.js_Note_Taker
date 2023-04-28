const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

router.use((req, res, next) => {
  next();
});

// main /api page. not used for now
router.get("/", (req, res) => {
  res.end();
});

// route to the api/notes endpoint. once GET request is received, the db.json file is read and sent out
router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db", "db.json"), "utf8", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).send("error loading saved notes");
    }
    res.send(data);
  });
});

// post route to api/notes
router.post("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db", "db.json"), "utf8", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).send("error loading saved notes");
    }

    // if the db.json file is empty, this will set it to an empty array so we can push the new note into it
    let db = [];
    if (data) {
      db = JSON.parse(data);
    }

    // creates a new note with a unique id and the info received in the req.body
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    // pushes the new note into the db variable and re-writes the db file
    db.push(newNote);
    fs.writeFile(
      path.join(__dirname, "../db", "db.json"),
      JSON.stringify(db),
      (err) => {
        if (err) return console.log("Error: ", err);
      }
    );
    res.send(console.log("Note saved"));
  });
});

// delete route to api/notes that accepts a specific id to delete
router.delete(`/notes/:id`, (req, res) => {
  fs.readFile(path.join(__dirname, "../db", "db.json"), "utf8", (err, data) => {
    if (err) res.status(500).send(console.log("error loading saved notes"));

    let db = [];
    if (data) db = JSON.parse(data);

    // pulls the id value out of the req.params
    const { id } = req.params;
    // runs through each note stored in db. if the id matches the id of a note in the file, that note is spliced out of the array
    db.forEach((note) => {
      if (note.id === id) {
        let index = db.indexOf(note);
        db.splice(index, 1);
        console.log("removed the following note", note);
      } else {
        console.log("no note with that id is logged.");
      }
    });

    // rewrited the file with the new note added
    fs.writeFile(
      path.join(__dirname, "../db", "db.json"),
      JSON.stringify(db),
      (err) => {
        if (err) return console.error("Error: ", err);
      }
    );
    res.send(console.log("Note deleted"));
  });
});

module.exports = router;
