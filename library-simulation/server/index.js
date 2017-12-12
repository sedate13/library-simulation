const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const port = 3001;
const app = express();

app.use(json());
app.use(cors());
app.use(
  session({
    secret: "blah",
    resave: false,
    saveUninitialized: false
  })
);

app.listen(port, () => {
  console.log(`Oh geeze Rick, Summer is listening on ${port}`);
});
