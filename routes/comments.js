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
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    await comment.save();
    await car.comments.push(comment);
    await car.save();
    res.redirect(`/cars/${car._id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/cars");
  }
});

router.get("/:comment_id/edit", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    const comment = await Comment.findById(req.params.comment_id);
    res.render("comments/edit", { comment: comment, car: car });
  } catch (err) {
    res.redirect("back");
  }
});

router.put("/:comment_id", async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
    res.redirect(`/cars/${req.params.id}`);
  } catch (err) {
    res.redirect("back");
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
