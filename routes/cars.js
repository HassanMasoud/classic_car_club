const express = require("express");
const router = express.Router();
const Car = require("../models/car");
const middleware = require("../middleware");

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.render("cars/index", { cars: cars });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", middleware.isLoggedIn, async (req, res) => {
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

router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("cars/new");
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate("comments")
      .exec();
    res.render("cars/show", { car: car });
  } catch (err) {
    if (err || !car) {
      req.flash("error", "Car not found");
      res.redirect("/cars");
    }
  }
});

router.get("/:id/edit", middleware.checkCarOwnership, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render("cars/edit", { car: car });
  } catch (err) {
    res.redirect("/cars");
  }
});

router.put("/:id", middleware.checkCarOwnership, async (req, res) => {
  try {
    await Car.findByIdAndUpdate(req.params.id, req.body.car);
    res.redirect(`/cars/${req.params.id}`);
  } catch (err) {
    res.redirect("/cars");
  }
});

router.delete("/:id", middleware.checkCarOwnership, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    req.flash("success", "Car deleted");
    res.redirect("/cars");
  } catch (err) {
    res.redirect("/cars");
  }
});

module.exports = router;
