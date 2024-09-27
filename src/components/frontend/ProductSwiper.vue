<template>
  <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :spaceBetween="10"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
    class="mySwiper2"
    ref="ThumbsSwiper"
  >
    <SwiperSlide>
      <div class="ratio ratio-1x1">
        <img alt="產品圖片" :src="product.imageUrl"  class="object-fit-cover"/>
      </div>
    </SwiperSlide>
    <SwiperSlide v-for="item in product.images" :key="item.id">
      <div class="ratio ratio-1x1">
        <img alt="產品圖片" :src="item" class="object-fit-cover position-absolute
        top-0 bottom-0 start-0 end-0"/>
      </div>
    </SwiperSlide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper"
  >
    <SwiperSlide>
      <div class="ratio ratio-1x1 object-fit-cover">
        <img alt="" :src="product.imageUrl"/>
      </div>
    </SwiperSlide>
    <SwiperSlide v-for="item in product.images" :key="item.id">
      <div class="ratio ratio-1x1 object-fit-cover">
        <img alt="" :src="item"/>
      </div>
    </SwiperSlide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    product: {},
  },
  data() {
    return {
      thumbsSwiper: '',
      modules: [FreeMode, Navigation, Thumbs],
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
  },
};
</script>
