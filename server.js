const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

/**DB */
const db = require("./client/models")
const{ Article } = db

//routes//
app.post("/api/saved", (req, res) => {

// get the posted object
var article = req.body
console.log(article)
  //call Article.create
    //then return some json

Article.create(article)
.then(() => {
  res.json(article)
})
.catch((err) => {
  res.json(err)
})
})

app.get('/api/saved',(req,res) => {
 Article.find({}).then(articles => res.json(articles))
})
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
