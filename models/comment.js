const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: {
      type: String
    }
  }
});

module.exports = mongoose.model("Comment", commentSchema);
