const express = require("express"),
app = express();
const {showHomePage, savedSubmission, showLogIn} = require("./controllers/homeController");

const session = require('express-session');
app.use(session({
  secret: '1973108824',
  resave: false,
  saveUninitialized: true
}));

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.get("/", (req, res) => {
  res.send("Welcome to Chessmate!");
  });

app.listen(app.get("port"), () => {
  console.log(
      `Server running at http://localhost:${app.get(
          "port"
      )}`
  );
});

app.get("/homepage", showHomePage);
app.post("/homepage", savedSubmission);

app.get("/LogIn", showLogIn);
app.post("/LogIn", savedSubmission);

app.get('/elo-rating', showElo);

const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);