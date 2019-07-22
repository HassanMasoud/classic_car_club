const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String
  },
  author: {
    type: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
