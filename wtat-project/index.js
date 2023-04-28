
const express = require("express"),
 app = express();
app.set("port", process.env.PORT || 3000);
app.get("/", (req, res) => {
 res.send("Welcome to Confetti Cuisine!");
});
app.listen(app.get("port"), () => {
 console.log(
 `Server running at http://localhost:${app.get(
"port"
 )}`
 );
});

app.use(
  express.urlencoded({
  extended: false
  })
 );
 app.use(express.json());
