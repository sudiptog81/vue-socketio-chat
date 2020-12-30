<template>
  <div class="chatroom">
    <div id="messages">
      <div class="message-container" v-for="m in messages" :key="m.id">
        <message :message="m" />
      </div>
    </div>

    <form @submit="handleForm">
      <input :disabled="!connected" autofocus type="text" v-model="message" />
      <input :disabled="!connected" type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";

export default {
  name: "ChatRoom",
  components: { Message },
  props: {
    connected: {
      type: Boolean,
      required: true
    },
    socket: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    message: "",
    messages: [],
    announcements: []
  }),
  created() {
    this.socket.on("userJoinBroadcast", u => {
      this.messages.push({ ...u, type: "join" });
    });
    this.socket.on("userLeaveBroadcast", u => {
      this.messages.push({ ...u, type: "leave" });
    });
    this.socket.on("messageBroadcast", m => {
      this.messages.push(m);
    });
  },
  methods: {
    handleForm(e) {
      e.preventDefault();
      if (!this.connected) {
        alert("Not Connected");
        return;
      }
      this.socket.emit("messageSent", this.message);
      this.message = "";
    }
  }
};
</script>

<style lang="scss">
.chatroom {
  display: flex;
  flex-direction: column;

  font-family: monospace;

  .messages {
    overflow-y: scroll;
  }

  form {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;

    display: grid;
    grid-template-columns: 3fr 1fr;

    input {
      padding: 1em;
    }
  }
}
</style>
