<template>
  <section class="page-title d-flex flex-column justify-content-center text-center">
    <h3>我的收藏</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-light">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          我的收藏
        </li>
      </ol>
    </nav>
  </section>
  <div class="container cart">
    <template v-if="favorited.length">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10">
          <div class="border border-2 border-info mb-3">
            <div class="p-3 p-md-4">
              <div class="row d-none d-md-flex border-bottom pb-3 fw-semibold">
                <div class="col-2"></div>
                <div class="col-3">商品名稱</div>
                <div class="col-3 text-center">金額</div>
                <div class="col-4"></div>
              </div>
              <ul v-for="item in favorited" :key="item.id"
                class="row list-unstyled align-items-center border-bottom
                py-3 mb-0 position-relative">
                <li class="col-5 col-md-2">
                  <div class="product-img">
                    <img :src="item.imageUrl" alt="商品圖片"
                      class="object-fit-cover"
                      @click="gotoProduct(item.id)"
                      @keydown="gotoProduct(item.id)">
                  </div>
                </li>
                <li class="col-5 col-md-9 product-content">
                  <ul class="row flex-column flex-md-row list-unstyled
                    align-items-center gy-2">
                    <li class="col col-md-4 product-title">
                      <p class="mb-0">{{ item.title }}</p>
                    </li>
                    <ul class="col col-md-4 list-unstyled d-flex flex-column text-md-center">
                      <li class="product-price">
                        <p class="mb-0 text-dark" v-if="item.price">
                          NT${{ $filters.currency(item.price) }}
                        </p>
                        <p class="mb-0 text-dark" v-else>
                          NT${{ $filters.currency(item.origin_price) }}
                        </p>
                        <del class="text-muted" v-if="item.origin_price != item.price">
                          NT${{ $filters.currency(item.origin_price) }}
                        </del>
                      </li>
                    </ul>
                    <li class="col col-md-4 text-md-center">
                      <button class="btn btn-sm btn-info rounded-0 px-3"
                        @click.stop="addtoCart(item)" type="button"
                        :disabled="item.id === btnLoading">
                        加入購物車
                      </button>
                    </li>
                  </ul>
                </li>
                <li class="col-1 d-flex justify-content-end">
                  <button class="btn p-1 ms-1" type="button"
                    @click="delFav(item)">
                    <i class="fa-solid fa-trash text-gray fs-4"/>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="text-end mb-2">
            <button class="btn btn-sm btn-outline-gray" type="button"
              @click="confirmClearAll">
              清空收藏
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-xl-7">
          <div class="text-center p-5">
            <i class="fa-solid fa-heart text-gray mb-5 d-block"
              style="font-size: 120px;"></i>
            <h5 class="mb-3">我的收藏目前沒有商品</h5>
            <button class="btn btn-secondary fw-semibold" @click="gotoShop">
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
  },
};
</script>
