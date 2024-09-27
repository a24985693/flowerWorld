import { defineStore } from 'pinia';

export default defineStore('path', {
  state: () => ({
    fullPath: '',
  }),
  actions: {
    getPath(path) {
      this.fullPath = path;
    },
  },
});
