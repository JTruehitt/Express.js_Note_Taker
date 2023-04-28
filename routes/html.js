const express = require("express");
const router = express.Router();
const path = require("path");

// setting up base middleware, but not used for anything with this app for now
router.use((req, res, next) => {
  next();
});

// route to render the notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "notes.html"));
});

// catch all route to render the main page
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = router;
