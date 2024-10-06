<template>
  <AdminNavbar/>
  <div class="container" style="margin-top:80px;">
    <ToastMessages/>
    <router-view/>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import AdminNavbar from '@/components/backend/AdminNavbar.vue';
import ToastMessages from '@/components/ToastMessages.vue';
import toastStore from '@/stores/toastStore';
import { mapActions } from 'pinia';

export default {
  components: {
    AdminNavbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  methods: {
    ...mapActions(toastStore, ['clearMessage']),
  },
  created() {
    this.clearMessage();
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    const url = `${process.env.VUE_APP_API}api/user/check`;

    this.$http.post(url)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login');
        }
      });
  },
};
</script>
