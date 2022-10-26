<template>
  <div class="h-96 bg-base-300 relative flex">
    <div class="overflow-y-auto h-5/6 w-full">
      <div v-for="(message, index) in messages" :key="index">
        <ChatMessage
          :message="{ text: message.text, user: getUser(message.user) }"
        />
      </div>
      <div ref="lastMessage"></div>
    </div>
    <ChatInput
      v-model="message.text"
      class="absolute w-full bottom-1 h-16"
      @submit="onPostMessages"
    />
  </div>
</template>
<script>
export default {
  props: {
    chatid: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    chatidWatcher: null,
    chat: [],
    messages: [],
    message: {
      text: "",
      chat: "",
      user: "",
    },
  }),
  async fetch() {
    this.startLoading();
    //Checks if the chatid is passed correctly
    this.chatidWatcher = this.$watch("chatid", () => {
      this.onGetChat();
      //Opens the socket connection
      this.socket.on(this.chatid, (received) => {
        this.messages.push(received);
      });
      //-----------------------------
    });
    this.finishLoading();
  },
  mounted() {
    //Initializes the socket
    this.socket = this.$nuxtSocket({ persist: true });
    this.$refs.lastMessage.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToElement();
      });
    },
  },
  methods: {
    getUser(userId) {
      const user = this.chat.chatters.find(({ user }) => user.id == userId);
      if (!user) {
        return { user: { name: "user", avatar: "", id: "" } };
      }
      return user.user;
    },
    scrollToElement() {
      const el = this.$refs.lastMessage;
      if (el) {
        el.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "nearest",
        });
      }
    },
    async onGetChat() {
      try {
        //------------------Loads the chat------------------------
        this.startLoading();
        this.chat = await this.$api.chat.getChatRoom(this.chatid);
        this.messages = this.chat.messages;
        this.finishLoading();
        //--------------------------------------------------------

        //Removes the watcher
        this.chatidWatcher();
      } catch (error) {
        console.log(error);
      }
    },

    //API to post messages into the chat
    async onPostMessages() {
      await this.$api.chat.postMessage({
        text: this.message.text,
        chat: this.chatid,
      });
    },
    //-------------------Nuxt loading stuff-----------------------
    startLoading() {
      if (process.client) {
        this.$nextTick(() => {
          this.$nuxt.$loading.start();
        });
      }
    },
    finishLoading() {
      if (process.client) {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish();
        });
      }
    },
    //-----------------------------------------------------------
  },
};
</script>