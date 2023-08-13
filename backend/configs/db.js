require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

module.export = mongoose;
