const { throws } = require("assert");
const express = require("express");

const hbs = require("hbs");
const { dirname } = require("path");
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, "public")));

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then((beersData) => {
      res.render("beers", { title: "beers", data: beersData });
    })
    .catch((err) => {
      res.render("errors", { title: "Oops", data: err });
    });
});

app.get("/random-beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then((beersData) => {
      console.log(beersData[0]);
      res.render("random", {
        title: "random",
        beer: { ...beersData[Math.floor(Math.random() * beersData.length)], random: true },
      });
    })
    .catch((err) => {
      res.render("errors", { title: "Oops", data: err });
    });
});

// ...

// Add the route handlers here:

app.get("/", (req, res) => {
  res.render("index", { title: "home" });
});

app.listen(3000, () => console.log("🏃‍ on port 3000"));
