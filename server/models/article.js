const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    author: {
      type: String,
      ref: 'users',
      required: [true, 'Author is required']
    },
    category : {
      type: String,
      required: [true, 'Category is required']
    },
    image : String
  },
  { timestamps: true }
);

module.exports = mongoose.model("articles", articleSchema);