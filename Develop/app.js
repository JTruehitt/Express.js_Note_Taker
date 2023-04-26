const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

const htmlRouter = require("./routes/html");
const apiRouter = require("./routes/api");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRouter);
app.use(htmlRouter);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
