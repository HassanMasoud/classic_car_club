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

router.get("/:id/edit", checkOwnership, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render("cars/edit", { car: car });
  } catch (err) {
    res.redirect("/cars");
  }
});

router.put("/:id", checkOwnership, async (req, res) => {
  try {
    await Car.findByIdAndUpdate(req.params.id, req.body.car);
    res.redirect(`/cars/${req.params.id}`);
  } catch (err) {
    res.redirect("/cars");
  }
});

router.delete("/:id", checkOwnership, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect("/cars");
  } catch (err) {
    res.redirect("/cars");
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

async function checkOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    try {
      const car = await Car.findById(req.params.id);
      if (car.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    } catch (err) {
      res.redirect("back");
    }
  } else {
    res.redirect("back");
  }
}

module.exports = router;
