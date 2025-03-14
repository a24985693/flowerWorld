<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="container mt-5 pt-3">
    <div class="row justify-content-center product-page gy-4 mb-5">
      <div class="col-12 col-md-5 h-100">
        <ProductSwiper :product="product"/>
      </div>
      <div class="col-12 col-md-7">
        <span class="bg-primary d-inline-block rounded fs-14 px-2 py-1 mb-2">
          #{{ product.category }}
        </span>
        <div class="row align-items-center mb-2">
          <div class="col">
            <h2 class="mb-0">{{ product.title }}</h2>
          </div>
          <div class="col align-self-start text-end">
            <span @click.stop="setFav(product)"
              @keydown.stop="setFav(product)">
              <i :class="favState(product)" class="fs-4"/>
            </span>
          </div>
        </div>
        <div class="mb-3">
          <div class="d-flex align-items-center">
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
          <div class="pre-line">
            {{ product.content }}
          </div>
        </div>
        <div class="row flex-column flex-md-row mb-5 g-3">
          <div class="col-12 col-md-6">
            <label for="number" class="d-none"/>
            <div class="input-group">
              <button type="button" class="btn btn-info rounded-0 fw-bold fs-5 py-1"
                @click="updateQuantity('minus');"
                :disabled="quantity <= 1">
                -
              </button>
              <input type="number" class="form-control text-center"
                v-model="quantity" id="number" min="1" max="20"
                @change="updateQuantity()">
              <button type="button" class="btn btn-info rounded-0 fw-bold fs-5 py-1"
                @click="updateQuantity('plus');"
                :disabled="quantity >= 20">
                +
              </button>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <button type="button" class="btn btn-info rounded-0 w-100 h-100"
              @click="addtoCart(product, quantity)"
              :disabled="product.id === btnLoading">
              <div class="spinner-border spinner-border-sm"
                role="status" v-if="btnLoading">
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
  <section class="container text-center">
    <h2 class="title-border-bottom mb-4">推薦商品</h2>
    <div class="overflow-hidden">
      <PreferProduts/>
    </div>
  </section>
</template>

<script>
import ProductSwiper from '@/components/frontend/ProductSwiper.vue';
import PreferProduts from '@/components/frontend/PreferProduts.vue';
import ProductTabs from '@/components/frontend/ProductTabs.vue';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favoriteStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    ProductSwiper,
    PreferProduts,
    ProductTabs,
  },
  data() {
    return {
      quantity: 1,
      bsCollapse: {},
    };
  },
  watch: {
    $route() {
      if (this.$route.params.productId != null) {
        this.getProduct(this.$route.params.productId);
      }
    },
  },
  computed: {
    ...mapState(productStore, ['product', 'isLoading']),
    ...mapState(cartStore, ['btnLoading']),
  },
  methods: {
    ...mapActions(productStore, ['getProduct']),
    ...mapActions(cartStore, ['addtoCart']),
    ...mapActions(favoriteStore, ['setFav', 'favState']),
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
  },
};
</script>
