const User = require("../models/User");
const { nanoid } = require("../config/nanoid");

const disconnectionListener = (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", async () => {
      const user = await User.findOne({ socketId: socket.id });
      if (user) {
        io.emit("userLeaveBroadcast", {
          id: nanoid(),
          nickname: user.nickname,
        });
        await User.deleteOne({ _id: user._id });
      }
    });
  });
};

module.exports = disconnectionListener;
