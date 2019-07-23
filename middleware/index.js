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
        res.redirect("back");
      }
    } catch (err) {
      res.redirect("back");
    }
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const comment = await Comment.findById(req.params.comment_id);
      if (comment.author.id.equals(req.user._id)) {
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
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
