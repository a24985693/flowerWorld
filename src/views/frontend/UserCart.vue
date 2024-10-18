<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title">
    <h2>購物車</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-light">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          購物車
        </li>
      </ol>
    </nav>
  </section>
  <div class="container">
    <div class="row justify-content-center text-center mb-5">
      <div class="col-4 col-md-3">
        <div class="pay-step bg-info text-white">
          <span>1</span>
        </div>
        <span>確認訂單</span>
      </div>
      <div class="col-4 col-md-3">
        <div class="pay-step border">
          <span>2</span>
        </div>
        <span>填寫資料</span>
      </div>
      <div class="col-4 col-md-3">
        <div class="pay-step border">
          <span>3</span>
        </div>
        <span>付款</span>
      </div>
    </div>
    <div class="row" v-if="cartLength !== 0">
      <div class="col-12">
        <div class="row mt-3">
          <div class="col-12 col-lg-8">
            <div class="mb-3">
              <div class="px-3">
                <div class="row d-none d-md-flex fw-semibold border-bottom py-3 mb-2">
                  <div class="col-2"></div>
                  <div class="col-9">
                    <div class="row">
                      <div class="col-5">商品名稱</div>
                      <div class="col-4 text-center">數量</div>
                      <div class="col-3 text-end">金額</div>
                    </div>
                  </div>
                  <div class="col-1"></div>
                </div>
                <div v-for="item in cart.carts" :key="item.id"
                  class="row align-items-center border-bottom border-dark
                    py-3 mb-0">
                  <div class="col-5 col-md-2">
                    <div class="ratio ratio-1x1 cursor-pointer">
                      <img :src="item.product.imageUrl" alt="商品圖片"
                      class="object-fit-cover"
                        @click="gotoProduct(item.product.id)"
                        @keydown="gotoProduct(item.product.id)">
                    </div>
                  </div>
                  <div class="col-5 col-md-9">
                    <div class="row flex-column flex-md-row align-items-center gy-3">
                      <div class="col-12 col-md-5">
                        <p>{{ item.product.title }}</p>
                      </div>
                      <div class="col-12 col-md-4 update-num
                        align-items-center justify-content-center">
                        <div class="input-group border">
                          <label for="number" class="d-none"/>
                          <button type="button" class="btn px-2 py-1"
                            @click="updateCart(item, item.qty-1)"
                            :disabled="item.qty <= 1">
                            <i class="fa-solid fa-minus"/>
                          </button>
                          <input type="number" class="shadow-none form-control text-center"
                            v-model="item.qty" id="number" min="1" max="100"
                            @change="updateCart(item, item.qty)">
                          <button type="button" class="btn px-2 py-1"
                            @click="updateCart(item, item.qty+1);"
                            :disabled="item.qty >= 20">
                            <i class="fa-solid fa-plus"/>
                          </button>
                        </div>
                      </div>
                      <div class="col-12 col-md-3 text-md-end">
                        NT${{ $filters.currency(item.total) }}
                      </div>
                    </div>
                  </div>
                  <div class="col-2 col-md-1">
                    <div class="delete-icon text-end">
                      <button class="btn px-0" type="button"
                        @click="deleteCartItem(item)">
                        <i class="fa-solid fa-trash text-gray fs-5"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-between mb-4">
              <div class="col">
                <span>共 {{cartLength}} 件商品</span>
              </div>
              <div class="col text-end">
                <button class="btn btn-sm btn-outline-gray" type="button"
                  @click="confirmDeleteAll">
                  清空購物車
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="border border-2 border-info">
              <div class="w-100 bg-info text-white fs-5 text-center py-2">
                總計
              </div>
              <div class="py-4 px-3">
                <div class="mb-5">
                  <div class="text-end d-flex justify-content-between mb-1">
                    <p>小計</p>
                    <p>NT${{ $filters.currency(cart.total) }}</p>
                  </div>
                  <div v-if="cart.final_total !== cart.total"
                    class="text-end d-flex justify-content-between text-muted mb-1">
                    <p>折扣</p>
                    <p>{{ $filters.currency(cart.total-cart.final_total) }}</p>
                  </div>
                  <div v-if="cart.final_total !== cart.total"
                    class="text-end d-flex justify-content-between text-muted">
                    <p>已套用優惠券</p>
                    <p>{{ cart.carts[0].coupon.code }}</p>
                  </div>
                  <div>
                    <label for="coupon" class="d-none"/>
                    <div class="input-group mt-3 mb-1">
                      <input type="text" class="form-control rounded-0"
                        placeholder="請輸入優惠碼"
                        v-model="tempCouponCode" id="coupon">
                      <button class="btn btn-info"
                        @click="sendCouponCode">套用</button>
                    </div>
                    <span class="text-danger" v-if="couponWarning">
                      *{{ couponWarning }}
                    </span>
                  </div>
                </div>
                <hr>
                <li class="text-end d-flex justify-content-between fs-5 fw-semibold mb-3">
                  <p>總計</p>
                  <p>NT${{ $filters.currency(cart.final_total) }}</p>
                </li>
                <div class="text-end">
                  <router-link to="/information" class="btn btn-secondary w-100
                    fw-bold">
                    下一步
                    <i class="fa-solid fa-angle-right"/>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center p-5" v-else>
      <i class="fa-solid fa-cart-shopping text-gray fs-120 mb-5"/>
      <h5 class="mb-3">購物車目前沒有商品</h5>
      <button class="btn btn-secondary fw-semibold" @click="gotoShop">
        繼續購物
      </button>
    </div>
  </div>
</template>

<script>
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      tempCouponCode: '',
    };
  },
  computed: {
    ...mapState(cartStore, ['cart', 'cartLength', 'couponWarning', 'isLoading']),
  },
  methods: {
    ...mapActions(productStore, ['gotoProduct']),
    ...mapActions(cartStore, [
      'getCart',
      'updateCart',
      'deleteCartItem',
      'confirmDeleteAll',
      'addCouponCode',
      'returnPage',
      'gotoShop',
    ]),
    sendCouponCode() {
      this.addCouponCode(this.tempCouponCode);
      this.tempCouponCode = '';
    },
  },
  created() {
    this.getCart();
  },
};
</script>
