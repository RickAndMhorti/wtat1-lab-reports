const express = require("express"),
    app = express();

const {showHomePage, savedSubmission} = require("./controllers/homeController");

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

const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);

