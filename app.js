const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Car = require("./models/car");

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () =>
  console.log("Connected to MongoDB")
);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const carsRoute = require("./routes/cars");

app.get("/", (req, res) => {
  res.render("landing");
});

app.use("/cars", carsRoute);

app.listen(process.env.PORT || 3000, process.env.IP, () =>
  console.log("Server started")
);
