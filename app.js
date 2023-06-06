const express = require("express");
const mongoose = require("mongoose");
const Trainees = require("./model/todoModel");

const app = express();
const port = process.env.PORT || 8080;

// config ejs
app.set("view engine", "ejs");
require("dotenv").config();

// custom middleware
// app.use((req, res, next) => {
//   console.log("a request was just made");
//   console.log(req.method);
//   console.log(req.path);
//   next();
// });
app.use(express.static("public"));

mongoose
  .connect(process.env.DBURL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

// TESTING OUR MODEL AND DB
// for saving to the DB

app.get("/add-trainee", async (req, res) => {
  const TRAINEES = new Trainees({
    name: "Kruz",
    profession: "Senior Trader",
    description: "He dey code dieeeee!",
  });
  // TRAINEES.save()
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  try {
    const savedTrainees = await TRAINEES.save();
    res.send(savedTrainees);
  } catch (err) {
    console.log(err);
  }
});

// For getting info from the DB
app.get("/all-trainees", async (req, res) => {
  try {
    const allTrainees = await Trainees.find();
    res.send(allTrainees);
  } catch (err) {
    console.log(err);
  }

  // .then((results)=>{
  // res.send(results)
  // })

  // .catch((err)=>{
  //   console.log(err);
  // })
});
// To get a single Trainee
app.get("/single-trainee", async (req, res) => {
  try {
    const singleTrainee = await Trainees.findById("647df2eb997cd86241fb583b");
    res.send(singleTrainee);
  } catch (err) {
    console.log(err);
  }
  // Trainees.findById("647df2eb997cd86241fb583b")
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

// routes
const trainees = [
  { name: "Christy", profession: "front-end dev" },
  { name: "Ejiro", profession: "back-end dev" },
  { name: "Henry", profession: "mobile dev" },
  { name: "John", profession: "desktop dev" },
];

app.get("/", function (req, res) {
  res.render("index", { title: "EJS Home Page", trainees });
});

app.get("/about", function (req, res) {
  res.render("about", { title: "EJS About Page" });
});

app.get("/create-list", function (req, res) {
  res.render("createList", { title: "EJS List Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "EJS Error" });
});

// server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
