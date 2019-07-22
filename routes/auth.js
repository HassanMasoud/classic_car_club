const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username: username });
  try {
    const user = await User.register(newUser, password);
    await passport.authenticate("local")(req, res, () => {
      res.redirect("/cars");
    });
    console.log(user);
  } catch (err) {
    console.log(err);
    return res.render("register");
  }
});

module.exports = router;
