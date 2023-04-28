const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

// importing route paths for html and api
const htmlRouter = require("./routes/html.js");
const apiRouter = require("./routes/api.js");

// declaring public as statid folder
app.use(express.static("public"));

// middleware to parse incoming data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware to direct to imported routers
app.use("/api", apiRouter);
app.use(htmlRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
