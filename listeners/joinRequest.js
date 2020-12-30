const User = require("../models/User");
const { nanoid, userId } = require("../config/nanoid");

const joinRequestListener = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRequest", async (userObj) => {
      try {
        userObj.socketId = socket.id;
        if (userObj._id) throw Error("nope");
        if (userObj.nickname) userObj.nickname += "#" + userId();
        const user = new User(userObj);
        await user.save();
        socket.emit("joinApprove", user);
        io.emit("userJoinBroadcast", {
          id: nanoid(),
          nickname: user.nickname,
        });
      } catch (err) {
        console.error(err);
        socket.emit("joinReject");
      }
    });
  });
};

module.exports = joinRequestListener;
