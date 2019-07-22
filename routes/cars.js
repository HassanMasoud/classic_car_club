const express = require("express");
const router = express.Router();
const Car = require("../models/car");

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.render("cars/index", { cars: cars });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const newCar = new Car(req.body.car);
    const author = {
      id: req.user._id,
      username: req.user.username
    };
    newCar.author = author;
    await newCar.save();
    res.redirect("/cars");
  } catch (err) {
    console.log(err);
    res.redirect("/cars");
  }
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("cars/new");
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate("comments")
      .exec();
    res.render("cars/show", { car: car });
  } catch (err) {
    console.log(err);
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
