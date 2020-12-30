const mongoose = require("mongoose");

const { userId } = require("../config/nanoid");

const UserSchema = new mongoose.Schema({
  socketId: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    default: () => "user#" + userId(),
  },
  color: {
    type: String,
    default: "#000000",
  },
});

module.exports = new mongoose.model("User", UserSchema);
