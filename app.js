const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

const htmlRouter = require("./routes/html.js");
const apiRouter = require("./routes/api.js");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRouter);
app.use(htmlRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
