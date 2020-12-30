<template>
  <div>
    <div
      class="announcement"
      v-if="message.type === 'join' || message.type === 'leave'"
    >
      <span>
        {{ message.nickname }}
        {{ message.type === "join" ? "joined" : "disconnected" }}
      </span>
    </div>
    <div v-else class="message" :id="'message-' + message.id">
      <div hidden>{{ message.by }} {{ message.color }}</div>
      <div class="timestamp">
        <span>
          {{ time }}
        </span>
      </div>
      <div>
        <span class="sender" :style="style">{{ message.nickname }}:</span>
        <span class="body">{{ message.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    style() {
      return { color: this.message.color };
    },
    time() {
      const d = new Date(this.message.sentAt);
      return (
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2) +
        ":" +
        ("0" + d.getSeconds()).slice(-2)
      );
    }
  }
};
</script>

<style lang="scss">
.announcement {
  color: #6f6f6f;
  span::before,
  span::after {
    content: "\2014";
  }
}

.timestamp {
  color: #6f6f6f;
}

.message {
  display: flex;
  text-align: left;
  margin: 5px;
  font-size: 1rem;
}

.sender {
  color: #f00;
  font-weight: bold;
  margin: 0 5px;
}

.body {
  color: #222;
}
</style>
