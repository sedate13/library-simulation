const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const port = 3001;
const axios = require("axios");
const connectionString = require("./config").massive;
const { secret } = require("./config").session;
const auth_controller = require("./controllers/auth_controller");
const massive = require("massive");
const passport = require("passport");
const app = express();

massive(connectionString)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/auth/login", auth_controller.login);
app.post("/api/auth/register", auth_controller.register);
// app.get(
//   "/api/authlogin",
//   passport.authenticate({
//     successRedirect: "/books",
//     failureRedirect: "/",
//     failureFlash: true
//   })
// );

app.listen(port, () => {
  console.log(`Oh geeze Rick, Summer is listening on ${port}`);
});
