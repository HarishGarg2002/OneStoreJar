const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    emailToken: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    //   currentHostel: {
    //     type: String,
    //     required: true,
    //   },
    //   currentRoom: {
    //     type: String,
    //     required: true,
    //   },
    //   chats: [{
    //     type: mongoose.Schema.Types.ObjectId,

    //   }]
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
