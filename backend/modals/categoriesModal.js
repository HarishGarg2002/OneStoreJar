const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  icon: {
    type: String,
  },
  iconType: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  colors: {
    type: Array,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
  navigationScreen: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
