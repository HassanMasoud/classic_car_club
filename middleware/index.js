const Car = require("../models/car");
const Comment = require("../models/comment");
const middlewareObj = {};

middlewareObj.checkCarOwnership = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const car = await Car.findById(req.params.id);
      if (car.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "You don't have the permission to do that");
        res.redirect("/cars");
      }
    } catch (err) {
      if (err || !car) {
        req.flash("error", "Car not found");
        res.redirect("/cars");
      }
    }
  } else {
    req.flash("primary", "Please sign in first");
    res.redirect("/login");
  }
};

middlewareObj.checkCommentOwnership = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const comment = await Comment.findById(req.params.comment_id);
      if (comment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "You don't have permission to do that");
        res.redirect("/cars");
      }
    } catch (err) {
      if (err || !comment) {
        req.flash("error", "Comment not found");
        res.redirect("/cars");
      }
    }
  } else {
    req.flash("primary", "Please sign in first");
    res.redirect("/login");
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("primary", "Please sign in first");
  res.redirect("/login");
};

module.exports = middlewareObj;
