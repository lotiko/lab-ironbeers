const express = require("express");
const hbs = require("hbs");
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + "/views/partials");
app
  .set("view engine", "hbs")
  .set("views", path.join(__dirname, "views"))
  .use(express.static(path.join(__dirname, "public")))
  .get("/beers", (req, res, next) => {
    punkAPI
      .getBeers()
      .then((beersData) => res.render("beers", { title: "beers", data: beersData }))
      .catch((err) => res.render("errors", { title: "Oops", data: err }));
  })
  .get("/beers/:id", (req, res, next) => {
    punkAPI
      .getBeer(req.params.id)
      .then((beerData) =>
        res.render("random", { title: "beer details", beer: { ...beerData[0], random: true } })
      )
      .catch((err) => res.render("errors", { title: "Oops", data: err }));
  })
  .get("/random-beers", (req, res, next) => {
    punkAPI
      .getBeers()
      .then((beersData) =>
        res.render("random", {
          title: "random",
          beer: { ...beersData[Math.floor(Math.random() * beersData.length)], random: true },
        })
      )
      .catch((err) => res.render("errors", { title: "Oops", data: err }));
  })

  .get("/", (req, res) => res.render("index", { title: "home" }))
  .listen(3000, () => console.log("🏃‍ on port 3000"));
