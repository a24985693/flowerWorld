<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/productsList">產品</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row gy-4 mb-5 justify-content-center product-page">
      <div class="col-12 col-md-5 product-img">
        <ProductSwiper :product="product"/>
      </div>
      <div class="col-12 col-md-7">
        <span class="bg-primary mb-2 fs-14 px-2 py-1 d-inline-block rounded">
          #{{ product.category }}
        </span>
        <div class="row align-items-center mb-2">
          <div class="col">
            <h3 class="mb-0">{{ product.title }}</h3>
          </div>
          <div class="col align-self-start text-end">
            <span @click.stop="setFav(product)"
              @keydown.stop="setFav(product)">
              <i :class="favState(product)" class="fs-4"/>
            </span>
          </div>
        </div>
        <div class="row justify-content-end align-items-end mb-3">
          <div class="col d-flex align-items-center">
            <div class="fs-5 fw-semibold pe-3" v-if="!product.price">
              NT${{ $filters.currency(product.origin_price) }}
            </div>
            <div class="fs-5 fw-semibold pe-3" v-if="product.price">
              NT${{ $filters.currency(product.price) }}
            </div>
            <del class="fs-6 text-muted"
            v-if="product.origin_price != product.price">
              NT${{ $filters.currency(product.origin_price) }}
            </del>
          </div>
        </div>
        <hr>
        <div class="py-2 mb-3">
          <div class="mb-4">{{ product.description }}</div>
          <div style="white-space: pre-line;">
            {{ product.content }}
          </div>
        </div>
        <div class="row flex-column flex-md-row mb-5 g-3">
          <div class="col-12 col-md-6">
            <label for="number" class="d-none"/>
            <div class="input-group">
              <button class="btn btn-info rounded-0 fw-bold fs-5 py-1"
                @click="updateQuantity('minus');"
                :disabled="quantity <= 1"
                type="button">
                -
              </button>
              <input type="number" class="form-control text-center" id="number"
                v-model="quantity" min="1" max="20"
                @change="updateQuantity()" value=3>
              <button class="btn btn-info rounded-0 fw-bold fs-5 py-1"
                @click="updateQuantity('plus');"
                :disabled="quantity >= 20"
                type="button">
                +
              </button>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <button type="button" class="btn btn-info rounded-0 w-100 h-100"
              @click="addtoCart(product, quantity)"
              :disabled="product.id === btnLoading">
              <div class="spinner-border spinner-border-sm"
                role="status"
                v-if="btnLoading">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i class="fa-solid fa-cart-shopping me-1" v-else/>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="container mb-5">
    <ProductTabs/>
  </section>
  <section class="container  text-center">
    <h4 class="mb-4">推薦商品</h4>
    <div class="row">
      <PreferSwiper/>
    </div>
  </section>
</template>

<script>
import ProductSwiper from '@/components/frontend/ProductSwiper.vue';
import PreferSwiper from '@/components/frontend/PreferSwiper.vue';
import ProductTabs from '@/components/frontend/ProductTabs.vue';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favoriteStore';
import pathStore from '@/stores/pathStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    ProductSwiper,
    PreferSwiper,
    ProductTabs,
  },
  data() {
    return {
      quantity: 1,
      bsCollapse: {},
    };
  },
  computed: {
    ...mapState(productStore, ['product', 'isLoading']),
    ...mapState(cartStore, ['btnLoading']),
  },
  methods: {
    ...mapActions(productStore, ['getProduct']),
    ...mapActions(cartStore, ['addtoCart']),
    ...mapActions(favoriteStore, ['setFav', 'favState']),
    ...mapActions(pathStore, ['getPath']),
    updateQuantity(icon) {
      if (this.quantity > 20) {
        this.quantity = 20;
      } else if (this.quantity < 1) {
        this.quantity = 1;
      } else if (icon === 'minus') {
        this.quantity -= 1;
      } else if (icon === 'plus') {
        this.quantity += 1;
      }
    },
  },
  created() {
    this.getProduct(this.$route.params.productId);
    this.getPath(this.$route.fullPath);
  },
};
</script>
