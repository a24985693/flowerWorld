<template>
  <section class="page-title">
    <h2>我的收藏</h2>
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
  <div class="container cart" v-if="favorited.length">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10">
        <div class="border border-2 border-info p-3 p-md-4 mb-3">
          <div class="row d-none d-md-flex fw-semibold border-bottom pb-3">
            <div class="col-2"></div>
            <div class="col-3">商品名稱</div>
            <div class="col-3 text-center">金額</div>
            <div class="col-4"></div>
          </div>
          <div v-for="item in favorited" :key="item.id"
            class="row align-items-center border-bottom
            py-3 mb-0 position-relative">
            <div class="col-5 col-md-2">
              <div class="ratio ratio-1x1 cursor-pointer">
                <img :src="item.imageUrl" alt="商品圖片"
                  class="object-fit-cover"
                  @click="gotoProduct(item.id)"
                  @keydown="gotoProduct(item.id)">
              </div>
            </div>
            <div class="col-5 col-md-9">
              <div class="row flex-column flex-md-row
                align-items-center gy-2">
                <div class="col col-md-4">
                  <p>{{ item.title }}</p>
                </div>
                <div class="col col-md-4 d-flex flex-column text-md-center">
                  <p class="text-dark" v-if="item.price">
                    NT${{ $filters.currency(item.price) }}
                  </p>
                  <p class="text-dark" v-else>
                    NT${{ $filters.currency(item.origin_price) }}
                  </p>
                  <del class="text-muted" v-if="item.origin_price != item.price">
                    NT${{ $filters.currency(item.origin_price) }}
                  </del>
                </div>
                <div class="col col-md-4 text-md-center">
                  <button class="btn btn-sm btn-info px-3"
                    @click.stop="addtoCart(item)" type="button"
                    :disabled="item.id === btnLoading">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <div class="col-2 col-md-1 d-flex justify-content-end">
              <button class="btn p-1 ms-1" type="button"
                @click="delFav(item)">
                <i class="fa-solid fa-trash text-gray fs-4"/>
              </button>
            </div>
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
  </div>
  <div class="text-center p-5" v-else>
    <i class="fa-solid fa-heart text-gray fs-120 mb-5"/>
    <h5 class="mb-3">我的收藏目前沒有商品</h5>
    <button class="btn btn-secondary fw-semibold" @click="gotoShop">
      繼續挑選
    </button>
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
