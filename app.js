const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/cars", (req, res) => {
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
  res.render("cars", { cars: cars });
});

app.listen(process.env.PORT || 3000, process.env.IP, () =>
  console.log("Server started")
);
