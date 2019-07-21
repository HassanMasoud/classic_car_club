const express = require("express");
const router = express.Router();

const cars = [
  {
    make: "Mitsubishi",
    model: "Galant",
    image:
      "https://images.pexels.com/photos/1008659/pexels-photo-1008659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    make: "Toyota",
    model: "Rav4",
    image:
      "https://images.pexels.com/photos/712618/pexels-photo-712618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    make: "Land Rover",
    model: "Range Rover",
    image:
      "https://images.pexels.com/photos/103290/pexels-photo-103290.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }
];

router.get("/", (req, res) => {
  res.render("cars", { cars: cars });
});

router.post("/", (req, res) => {
  const make = req.body.make;
  const model = req.body.model;
  const image = req.body.image;
  const newCar = { make: make, model: model, image: image };
  cars.push(newCar);
  res.redirect("/cars");
});

router.get("/new", (req, res) => {
  res.render("new");
});

module.exports = router;
