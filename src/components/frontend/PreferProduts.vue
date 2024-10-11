<template>
  <div class="prefer-product row flex-nowrap justify-content-start mb-4"
    ref="carousel">
    <div v-for="item in preferProducts" :key="item.id"
      class="col-6 col-md-4 col-lg-3" ref="preferProduct">
      <div class="card bg-transparent product-card h-100 mx-auto"
        @click.stop="gotoProduct(item.id)"
        @keydown.stop="gotoProduct(item.id)">
        <div class="overflow-hidden position-relative">
          <div class="more-text text-white text-center fw-bold
            position-absolute top-50">
            查看更多
          </div>
          <div class="ratio" style="--bs-aspect-ratio: 80%;">
            <img :src="item.imageUrl" class="card-img-top object-fit-cover w-100"
              alt="圖片">
          </div>
        </div>
        <div class="card-body px-0">
          <div class="heart rounded-circle bg-white p-1 pb-0"
            @click.stop="setFav(item)"
            @keydown.stop="setFav(item)">
            <i :class="favState(item)"/>
          </div>
          <h5 class="card-title text-start mb-1">{{ item.title }}</h5>
            <div class="d-flex align-items-center">
              <p class="price fw-semibold mb-0 me-2 text-blue" v-if="item.price">
                NT${{ $filters.currency(item.price) }}
              </p>
              <p class="price fw-semibold mb-0 text-blue" v-else>
                NT${{ $filters.currency(item.origin_price) }}
              </p>
              <del v-if="item.origin_price != item.price" class="text-muted">
                NT${{ $filters.currency(item.origin_price) }}
              </del>
            </div>
        </div>
        <div class="card-foot">
          <div class="btn-group btn-group-sm w-100">
            <button class="btn btn-sm w-100 btn-outline-info rounded-0 fw-bold py-2"
              type="button"
              @click.stop="addtoCart(item)"
              :disabled="item.id === btnLoading">
              <div class="spinner-border spinner-border-sm"
                role="status"
                v-if="item.id === btnLoading">
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
  <div class="row justify-content-center mb-3 d-none d-lg-flex">
    <div class="progress col" style="height: 7px;">
      <div class="progress-bar" role="progressbar" aria-valuenow="25"
        aria-valuemin="0" aria-valuemax="100"
        :style="{width: ( position + 4) * 10 + '%'}">
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-between">
    <button class="btn-pre btn btn-primary rounded-pill me-1"
      @click="goSlide('pre')"
      :disabled="position<=0">
      <i class="fa-solid fa-caret-left"></i>
      上一個
    </button>
    <button class="btn-next btn btn-primary rounded-pill ms-1"
      @click="goSlide('next')"
      :disabled="position + showNum >= totalNum">
      下一個
      <i class="fa-solid fa-caret-right"></i>
    </button>
  </div>
</template>

<script>
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favoriteStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      position: 0,
      totalNum: 1,
      showNum: 0,
    };
  },
  computed: {
    ...mapState(productStore, ['preferProducts']),
    ...mapState(cartStore, ['btnLoading']),
  },
  methods: {
    ...mapActions(productStore, ['getPreferProducts', 'gotoProduct']),
    ...mapActions(cartStore, ['addtoCart']),
    ...mapActions(favoriteStore, ['setFav', 'favState']),
    goSlide(direction) {
      const productWidth = this.$refs.preferProduct[0].offsetWidth;

      // 商品總數量
      this.totalNum = this.$refs.preferProduct.length;
      const { carousel } = this.$refs;
      // 輪播目前在畫面的寬度
      const carouselWidth = carousel.offsetWidth;

      // 輪播出現的數量 carouselWidth除商品寬
      this.showNum = carouselWidth / productWidth;

      // 輪播切換速度
      carousel.style.transition = 'transform 500ms';

      if (direction === 'pre' && this.position > 0) {
        this.position -= 1;
        carousel.style.transform = `translateX(-${
          this.position * productWidth
        }px`;
      } else if (direction === 'next' && this.position + this.showNum < this.totalNum) {
        this.position += 1;
        carousel.style.transform = `translateX(-${
          this.position * productWidth
        }px`;
      }
    },
  },
  created() {
    this.getPreferProducts();
  },
};
</script>
