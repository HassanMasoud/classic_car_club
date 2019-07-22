const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const seedDB = require("./seeds");

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () =>
  console.log("Connected to MongoDB")
);

app.use(
  require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

seedDB();

const carsRoute = require("./routes/cars");
const authRoute = require("./routes/auth");

app.get("/", (req, res) => {
  res.render("landing");
});

app.use("/cars", carsRoute);
app.use("/register", authRoute);

app.listen(process.env.PORT || 3000, process.env.IP, () =>
  console.log("Server started")
);
