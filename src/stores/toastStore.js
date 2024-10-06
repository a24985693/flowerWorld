import { defineStore } from 'pinia';

export default defineStore('toast', {
  state: () => ({
    messages: [],
  }),
  actions: {
    pushMessage(data) {
      const { style, title, content } = data;
      this.messages.push({ style, title, content });
    },
    clearMessage() {
      this.messages = [];
    },
  },
});
