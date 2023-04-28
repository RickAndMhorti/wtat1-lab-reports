

const express = require("express"),
    app = express();

const {showHomePage} = require("./controllers/homeController");


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

const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());