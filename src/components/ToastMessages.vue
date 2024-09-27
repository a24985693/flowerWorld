<template>
  <div class="toast-container position-fixed end-0 pe-3"
    style="top: 75px;">
    <ToastList v-for="(msg, key) in messages" :key="key" :msg="msg"/>
  </div>
</template>

<script>
import ToastList from '@/components/ToastList.vue';
import toastStore from '@/stores/toastStore';
import { mapState } from 'pinia';

export default {
  components: {
    ToastList,
  },
  computed: {
    ...mapState(toastStore, ['messages']),
  },
};
</script>
