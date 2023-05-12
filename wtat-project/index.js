const express = require("express"),
app = express();
const {showHomePage, savedSubmission, showLogIn, showElo} = require("./controllers/homeController");

const mongoose= require("mongoose").default;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chessmateDB', {useNewUrlParser: true});
}

const MongoDB = require("mongodb").MongoClient,
    dbURL = "mongodb://localhost:27017",
    dbName = "chessmate";

const ChessmateDB = mongoose.model("ChessmateDB", new mongoose.Schema({
    name: String,
    elo: Number,
    region: String
}));

const chessmate1 = new ChessmateDB({
   name: "Deez Nuts",
   elo: 4444,
   region: "NA"
});
chessmate1.save();
MongoDB.connect(dbURL, (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);
    db.collection("chessmate")
        .find()
        .toArray((error, data) => {
            if (error) throw error;
            console.log(data);
        });

});

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