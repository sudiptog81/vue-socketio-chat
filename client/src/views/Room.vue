<template>
  <div class="room">
    <chat-room
      v-if="user._id"
      :user="user"
      :socket="socket"
      :connected="connected"
    ></chat-room>
    <form v-else @submit="handleForm">
      <input
        :disabled="!connected"
        type="text"
        v-model="user.nickname"
        placeholder="nickname (optional)"
      />
      <input :disabled="!connected" type="color" v-model="user.color" />
      <input :disabled="!connected" type="submit" value="Enter" />
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";
import ChatRoom from "@/components/ChatRoom";

export default {
  name: "Room",
  components: { ChatRoom },
  data: () => ({
    user: {
      _id: "",
      nickname: "",
      color: "#000000"
    },
    connected: false,
    socket: io(process.env.VUE_APP_SOCKET_ENDPOINT || "http://localhost:5000")
  }),
  created() {
    this.socket.on("connect", () => {
      this.connected = true;
      console.log("Socket Connected");
      if (this.user._id) {
        const req = {};
        Object.assign(req, this.user);
        delete req._id;
        delete req.socketId;
        req.nickname = [...req.nickname]
          .splice(0, req.nickname.length - 5)
          .join("");
        this.socket.emit("joinRequest", req);
      }

      this.socket.on("joinApprove", user => {
        this.user = user;
      });

      this.socket.on("joinReject", () => {
        alert("Couldn't Enter");
      });

      this.socket.on("disconnect", () => {
        this.connected = false;
        console.log("Socket Disconnected");
      });
    });
  },
  destroyed() {
    this.socket.disconnect();
  },
  methods: {
    async handleForm(e) {
      e.preventDefault();
      if (!this.socket.id) {
        alert("Not Connected");
        return;
      }
      const req = {};
      if (this.user.nickname) req.nickname = this.user.nickname;
      if (this.user.color) req.color = this.user.color;
      this.socket.emit("joinRequest", req);
    }
  }
};
</script>

<style lang="scss">
form {
  display: flex;
  justify-content: center;

  input {
    padding: 1em;
  }

  input[type="color"] {
    -webkit-appearance: none;
    border: none;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: none;
  }
}
</style>
