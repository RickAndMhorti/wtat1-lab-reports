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

// Define the eloRating variable in the global scope
let eloRating = null;

// Define a route to handle incoming POST requests
app.post('/submit-elo-rating', function(req, res) {
  // Extract the Elo rating from the form data
  const newEloRating = parseInt(req.body.elo);

  if (newEloRating) {
    // Update the eloRating variable if a new rating was provided
    eloRating = newEloRating;
  }

  // Redirect to the Elo rating page
  res.redirect('/elo-rating');
});

// Define a route to display the Elo rating
app.get('/elo-rating', function(req, res) {
  // Render the EJS template with the current Elo rating
  res.render('elo-rating', { eloRating: eloRating });
});


const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(layouts);