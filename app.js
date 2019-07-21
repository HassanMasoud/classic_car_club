const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

const carsRoute = require("./routes/cars");

app.get("/", (req, res) => {
  res.render("landing");
});

app.use("/cars", carsRoute);

app.listen(process.env.PORT || 3000, process.env.IP, () =>
  console.log("Server started")
);
