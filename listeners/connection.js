const { nanoid } = require("nanoid");

const connectionListener = (io) => {
  io.on("connection", (socket) => {
    console.log("user with socket id", socket.id, "connected");
  });
};

module.exports = connectionListener;
