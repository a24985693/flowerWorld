<template>
  <div class="prefer position-relative">
    <div class="overflow-hidden px-3" style="width: calc();">
      <div class="row flex-nowrap prefer-carousel gx-4 mb-4" ref="carousel">
        <div v-for="item in preferProducts" :key="item.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3" ref="preferProduct">
          <div class="card product-card h-100 mx-auto"
            @click.stop="gotoProduct(item.id)"
            @keydown.stop="gotoProduct(item.id)">
            <div class="overflow-hidden position-relative">
              <div class="more-text">
                查看更多
              </div>
              <div class="ratio ratio-1x1">
                <img :src="item.imageUrl" class="card-img-top object-fit-cover w-100"
                  alt="圖片">
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-9 text-start">
                  <h5 class="card-title">{{ item.title }}</h5>
                </div>
                <div class="col-3 text-end">
                  <div class="heart"
                    @click.stop="setFav(item)"
                    @keydown.stop="setFav(item)">
                    <i :class="favState(item)"/>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <p class="price me-2" v-if="item.price">
                  NT${{ $filters.currency(item.price) }}
                </p>
                <p class="price" v-else>
                  NT${{ $filters.currency(item.origin_price) }}
                </p>
                <del v-if="item.origin_price != item.price" class="text-muted">
                  NT${{ $filters.currency(item.origin_price) }}
                </del>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mb-3 d-none d-lg-flex">
        <div class="progress col p-0" style="height: 7px;">
          <div class="progress-bar" role="progressbar" aria-valuenow="25"
            aria-valuemin="0" aria-valuemax="100"
            :style="{width: ( position + 4) * 10 + '%'}">
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="btn-pre btn btn-primary me-1
        position-absolute top-50 start-0"
        @click="goSlide('pre')"
        :disabled="position<=0">
        <i class="fa-solid fa-caret-left"></i>
      </button>
      <button class="btn-next btn btn-primary ms-1
        position-absolute top-50 end-0"
        @click="goSlide('next')"
        :disabled="position + showNum >= totalNum">
        <i class="fa-solid fa-caret-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import productStore from '@/stores/productStore';
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
  },
  methods: {
    ...mapActions(productStore, ['getPreferProducts', 'gotoProduct']),
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
