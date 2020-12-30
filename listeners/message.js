const { nanoid } = require("nanoid");
const User = require("../models/User");

const messageListener = (io) => {
  io.on("connection", (socket) => {
    socket.on("messageSent", async (msg) => {
      const user = await User.findOne({ socketId: socket.id });
      if (user) {
        io.emit("messageBroadcast", {
          id: nanoid(),
          by: user._id,
          nickname: user.nickname,
          color: user.color,
          message: msg,
          sentAt: Date.now(),
        });
      }
    });
  });
};

module.exports = messageListener;
