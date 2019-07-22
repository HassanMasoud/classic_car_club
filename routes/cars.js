const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/", async (req, res) => {
  // res.render("cars", { cars: cars });
  try {
    const cars = await Car.find({});
    res.render("index", { cars: cars });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const make = req.body.make;
    const model = req.body.model;
    const image = req.body.image;
    const description = req.body.description;
    const newCar = new Car({
      make: make,
      model: model,
      image: image,
      description: description
    });

    await newCar.save(newCar);
    res.redirect("/cars");
  } catch (err) {
    console.log(err);
    res.redirect("/cars");
  }
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate("comments")
      .exec();
    res.render("show", { car: car });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
