<template>
  <div class="view-height" @click="toggleNav" @keydown="toggleNav">
    <UserNavbar ref="UserNavbar"/>
    <div class="user-view">
      <router-view/>
    </div>
    <UserFooter/>
    <ToastMessages/>
  </div>
</template>

<script>
import UserNavbar from '@/components/frontend/UserNavbar.vue';
import UserFooter from '@/components/frontend/UserFooter.vue';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    UserNavbar,
    UserFooter,
    ToastMessages,
  },
  methods: {
    toggleNav(e) {
      if (e.target.dataset.name !== 'nav') {
        this.$refs.UserNavbar.hideNav();
      }
    },
  },
};
</script>
