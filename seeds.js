const mongoose = require("mongoose");
const Car = require("./models/car");
const Comment = require("./models/comment");

const data = [
  {
    make: "Volkswagen",
    model: "Beetle",
    image:
      "https://images.pexels.com/photos/1209774/pexels-photo-1209774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description:
      'The Volkswagen Beetle — officially the Volkswagen Type 1, informally in German the Käfer (meaning "beetle"), in parts of the English-speaking world the Bug, and known by many other nicknames in other languages—is a two-door, rear-engine economy car, intended for five occupants (later, Beetles were restricted to four people in some countries), that was manufactured and marketed by German automaker Volkswagen (VW) from 1938 until 2003.'
  },
  {
    make: "Ford",
    model: "Galaxie 500",
    image:
      "https://images.pexels.com/photos/97458/pexels-photo-97458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description:
      'The Ford Galaxie is a full-sized car that was built in the United States of America by Ford for model years 1959 through to 1974. The name was used for the top models in Ford\'s full-size range from 1958 until 1961, in a marketing attempt to appeal to the excitement surrounding the Space Race. For 1962, all full-size Fords wore the Galaxie badge, with "500" and "500/XL" denoting the higher series. '
  },
  {
    make: "AC",
    model: "Cobra 427",
    image:
      "https://images.pexels.com/photos/149813/pexels-photo-149813.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description:
      "The AC Cobra, sold as the Shelby Cobra in the United States, is an Anglo-American sports car with a Ford V8 engine, produced intermittently in both the UK and the US since 1962."
  }
];

const seedDB = async () => {
  try {
    await Car.deleteMany({});
    await Comment.deleteMany({});
    // console.log("Removed all cars");
    // data.forEach(async item => {
    //   const car = await Car.create(item);
    //   console.log("Added a new car");
    //   const comment = await Comment.create({
    //     text: "This car is awesome!",
    //     author: "Crystal"
    //   });
    //   await car.comments.push(comment);
    //   await car.save();
    //   console.log("Comment created");
    // });
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedDB;
