<template>
  <swiper :navigation="true" :modules="modules"
    class="prefer-swiper mySwiper"
    :slidesPerView="1"
    :spaceBetween="20"
    :option="swiperOption"
    :breakpoints="{
      576: {slidesPerView: 2},
      992: {slidesPerView: 4},
    }"
    >
    <SwiperSlide v-for="item in preferProducts" :key="item.id">
      <div class="card product-card mx-auto h-100 border"
        @click.stop="gotoProduct(item.id)"
        @keydown.stop="gotoProduct(item.id)">
        <div class="overflow-hidden position-relative">
          <div class="more-text text-white text-center fw-bold
            position-absolute top-50">
            查看更多
          </div>
          <img :src="item.imageUrl" class="card-img-top object-fit-cover w-100"
            alt="圖片">
        </div>
        <div class="card-body">
          <p class="fs-14 mb-1 text-start">#{{ item.category }}</p>
          <h5 class="card-title text-start">{{ item.title }}</h5>
          <div class="d-flex justify-content-between align-items-center">
            <p class="price fw-semibold mb-0 text-blue p-0" v-if="item.price">
              NT${{ $filters.currency(item.price) }}
            </p>
            <p class="price fw-semibold mb-0 text-blue p-0" v-else>
              NT${{ $filters.currency(item.origin_price) }}
            </p>
            <del v-if="item.origin_price != item.price">
              NT${{ $filters.currency(item.origin_price) }}
            </del>
          </div>
        </div>
        <div class="card-foot px-3 pb-3">
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
    </SwiperSlide>
  </swiper>
</template>

<script>
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Autoplay, Navigation, Pagination],
      swiperOption: {
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          clickable: true,
        },
        breakpoints: {
          1: {
            slidesPerView: 2,
            centeredSlides: false,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 20,
            centeredSlides: false,
          },
        },
      },
    };
  },
  computed: {
    ...mapState(productStore, ['preferProducts']),
    ...mapState(cartStore, ['btnLoading']),
  },
  methods: {
    ...mapActions(productStore, ['getPreferProducts', 'gotoProduct']),
    ...mapActions(cartStore, ['addtoCart']),
  },
  created() {
    this.getPreferProducts();
  },
};
</script>
