<template>
  <div class="toast-container position-fixed end-0 pe-3"
    style="top: 75px;">
    <ToastList v-for="(msg, key) in messages" :key="key" :msg="msg"/>
  </div>
</template>

<script>
import ToastList from '@/components/ToastList.vue';

export default {
  components: {
    ToastList,
  },
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style, title, content } = message;
      this.messages.push({ style, title, content });
    });
    this.emitter.on('delete-message', (message) => {
      const { style, title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
