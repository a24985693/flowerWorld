<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">花花世界</router-link>
      <button class="navbar-toggler border-none" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link mx-1" to="/dashboard/prodPucts">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-1" to="/dashboard/orders">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-1" to="/dashboard/coupon">優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mx-1" to="/dashboard/articles">文章</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link mx-1" type="button" @click.prevent="logout"
              @keydown.prevent="logout">
              登出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  methods: {
    logout() {
      const url = `${process.env.VUE_APP_API}logout`;
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/login');
          }
        });
    },
  },
  created() {
  },
  mounted() {
    const dataToggle = document.querySelectorAll('.nav-item');
    const myCollapse = document.getElementById('navbarNav');
    const bsCollapse = new Collapse(myCollapse, {
      toggle: false,
    });
    dataToggle.forEach((item) => {
      item.addEventListener('click', () => {
        bsCollapse.toggle();
      });
    });
  },
};
</script>
