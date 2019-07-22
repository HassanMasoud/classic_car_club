const mongoose = require("mongoose");
const Car = require("./models/car");
const Comment = require("./models/comment");

const data = [
  {
    make: "Volkswagen",
    model: "Beetle",
    image:
      "https://images.pexels.com/photos/1209774/pexels-photo-1209774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description: "Red VW Beetle"
  },
  {
    make: "Ford",
    model: "Galaxie 500",
    image:
      "https://images.pexels.com/photos/97458/pexels-photo-97458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Black Ford Galaxie"
  },
  {
    make: "AC",
    model: "Cobra 427",
    image:
      "https://images.pexels.com/photos/149813/pexels-photo-149813.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description: "Blue and white AC Cobra"
  }
];

const seedDB = async () => {
  try {
    await Car.deleteMany({});
    console.log("Removed all cars");
    data.forEach(async item => {
      const car = await Car.create(item);
      console.log("Added a new car");
      const comment = await Comment.create({
        text: "This car is awesome!",
        author: "Crystal"
      });
      await car.comments.push(comment);
      await car.save();
      console.log("Comment created");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedDB;
