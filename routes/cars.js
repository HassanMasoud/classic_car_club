const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/", async (req, res) => {
  // res.render("cars", { cars: cars });
  try {
    const cars = await Car.find({});
    res.render("cars", { cars: cars });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", (req, res) => {
  const make = req.body.make;
  const model = req.body.model;
  const image = req.body.image;
  const newCar = { make: make, model: model, image: image };
  cars.push(newCar);
  res.redirect("/cars");
});

router.get("/new", (req, res) => {
  res.render("new");
});

module.exports = router;
