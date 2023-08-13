const mongoose = require("mongoose");

const mainAnimationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  firstText: {
    type: String,
    required: true,
  },
  secondText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  start: {
    value: {
      type: Number,
      required: true,
    },
    easing: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  end: {
    value: {
      type: Number,
      required: true,
    },
    easing: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  textAnimation: {
    type: Object,
  },
  imageAnimation: {
    type: Object,
  },
});

const MainAnimation = mongoose.model("MainAnimation", mainAnimationSchema);

module.exports = MainAnimation;
