const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username: username });
  try {
    const user = await User.register(newUser, password);
    await passport.authenticate("local")(req, res, () => {
      req.flash("success", `Welcome to the club ${user.username}!`);
      res.redirect("/cars");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successFlash: "Awww yeah! Welcome back!",
    successRedirect: "/cars",
    failureFlash: true,
    failureRedirect: "/login"
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/cars");
});

module.exports = router;
