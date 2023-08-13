const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  images: { type: Array },
  sellers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  buyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// {
//     name: "OnePlus Nord";
//     price: 30000;
//     description: "OnePlus Nord is a smartphone developed by OnePlus. It was announced on 21 July 2020 and released on 21 July 2020. It is the company's first mid-range smartphone, and the first to be released since the OnePlus 7 series in May 2019. The Nord is the first OnePlus phone to feature a 90 Hz refresh rate display, and the first to feature a quad-camera setup.";
//     category: "Mobile";
//     quantity: 1;
// }
