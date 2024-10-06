<template>
  <div class="container cart">
    <template v-if="favorited.length">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9">
          <div class="border mb-3">
            <div class="fs-4 fw-semibold mb-3 p-3 bg-primary">我的收藏</div>
            <div class="px-3">
              <ul v-for="item in favorited" :key="item.id"
                class="row list-unstyled align-items-center
                py-3 position-relative">
                <li class="col-4 col-md-3">
                  <div class="product-img">
                    <img :src="item.imageUrl" alt="商品圖片"
                      class="object-fit-cover"
                      @click="gotoProduct(item.id)"
                      @keydown="gotoProduct(item.id)">
                  </div>
                </li>
                <li class="col-6 col-md-8 product-content">
                  <ul class="row flex-column flex-md-row list-unstyled
                    align-items-center gy-2">
                    <li class="col col-md-4 product-title">
                      <p class="mb-0 fw-semibold">{{ item.title }}</p>
                    </li>
                    <ul class="col col-md-3 list-unstyled d-flex flex-column flex-md-row
                      align-items-start align-items-md-center justify-content-between">
                      <li class="product-price">
                        <p class="fw-semibold mb-0 text-blue" v-if="item.price">
                          NT${{ $filters.currency(item.price) }}
                        </p>
                        <p class="fw-semibold mb-0 text-blue" v-else>
                          NT${{ $filters.currency(item.origin_price) }}
                        </p>
                        <del v-if="item.origin_price != item.price">
                          NT${{ $filters.currency(item.origin_price) }}
                        </del>
                      </li>
                    </ul>
                    <li class="col col-md-5">
                      <button class="btn btn-sm btn-info w-100 rounded-0 py-1 py-md-2"
                        @click.stop="addtoCart(item)" type="button"
                        :disabled="item.id === btnLoading">
                        <div class="spinner-border spinner-border-sm" role="status"
                          v-if="item.id === btnLoading">
                        </div>
                        <i class="fa-solid fa-cart-shopping me-1" v-else/>
                          加入購物車
                      </button>
                    </li>
                  </ul>
                </li>
                <li class="col-2 col-md-1 delete-icon text-end">
                  <button class="btn p-0" type="button"
                    @click="delFav(item)">
                    <i class="fa-solid fa-trash text-gray fs-5"/>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="row justify-content-between mb-2">
            <div class="col">
              <button class="btn btn-sm btn-outline-gray" type="button"
                @click="confirmClearAll">
                清空收藏
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-xl-7">
          <h4 class="mb-5">我的收藏</h4>
          <div class="text-center p-5">
            <i class="fa-solid fa-heart text-gray mb-5 d-block"
              style="font-size: 120px;"></i>
            <h5 class="mb-3">我的收藏目前沒有商品</h5>
            <button class="btn btn-blue fw-semibold" @click="gotoShop">
              繼續挑選
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favoriteStore';
import pathStore from '@/stores/pathStore';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(cartStore, ['btnLoading']),
    ...mapState(favoriteStore, ['favorited']),
  },
  methods: {
    ...mapActions(productStore, ['gotoProduct']),
    ...mapActions(cartStore, ['addtoCart', 'gotoShop']),
    ...mapActions(favoriteStore, ['delFav', 'confirmClearAll']),
    ...mapActions(pathStore, ['getPath']),
  },
  created() {
    this.getPath(this.$route.fullPath);
  },
};
</script>
