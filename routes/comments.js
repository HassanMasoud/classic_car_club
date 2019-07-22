const express = require("express");
const router = express.Router({ mergeParams: true });
const Car = require("../models/car");
const Comment = require("../models/comment");

router.get("/new", isLoggedIn, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.render("comments/new", { car: car });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    const comment = await Comment.create(req.body.comment);
    await car.comments.push(comment);
    await car.save();
    res.redirect(`/cars/${car._id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/cars");
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
