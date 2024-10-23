<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top
    border-bottom border-1 border-info nav-transition"
    :class="{ navAnimated: scrollNum}"
    data-name="nav">
    <div class="container" data-name="nav">
      <router-link class="navbar-brand nav-item fw-semibold" to="/" data-name="nav">
        <img src="@/assets/images/logo.avif" alt="logo" width="30px" height="30px">
          花花世界</router-link>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation" ref="navToggleBtn" data-name="nav">
        <span class="navbar-toggler-icon" data-name="nav"/>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/productsList" data-name="nav">
              產品列表
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/articlesList" data-name="nav">
              最新消息
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/inquire" data-name="nav">
              訂單查詢
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link position-relative" data-name="nav"
              to="/favorite">
              <i class="fa-solid fa-heart fs-4"/>
              <span class="icon-num bg-secondary text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold"
                v-if="favorited.length">
                {{ favorited.length }}
              </span>
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link position-relative" data-name="nav"
              to="/cart">
              <i class="fa-solid fa-cart-shopping fs-4"/>
              <span class="icon-num bg-secondary text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold"
                v-if="cartLength">
                {{ cartLength }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favoriteStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      scrollNum: '',
      bsCollapse: {},
    };
  },
  computed: {
    ...mapState(cartStore, ['cartLength']),
    ...mapState(favoriteStore, ['favorited']),

  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    animated() {
      this.scrollNum = window.scrollY;
    },
    hideNav() {
      this.bsCollapse.hide();
    },
  },
  created() {
    this.getCart();
    window.addEventListener('scroll', this.animated);
  },
  mounted() {
    const dataToggle = document.querySelectorAll('.nav-item');
    const myCollapse = document.getElementById('navbarNav');
    this.bsCollapse = new Collapse(myCollapse, {
      toggle: false,
    });
    dataToggle.forEach((item) => {
      item.addEventListener('click', () => {
        this.bsCollapse.hide();
      });
    });
  },
};
</script>
