const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const methodOverride = require("method-override");
const seedDB = require("./seeds");

dotenv.config();

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useFindAndModify: false },
  () => console.log("Connected to MongoDB")
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
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// Add current user to all routes
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// seedDB();

const carRoutes = require("./routes/cars");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comments");

app.get("/", (req, res) => {
  res.render("landing");
});

app.use("/cars", carRoutes);
app.use("/cars/:id/comments", commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () =>
  console.log("Server started")
);
