<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title d-flex flex-column justify-content-center text-center">
    <h3>購物車</h3>
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
  <div class="container cart">
    <div class="row align-items-center flex-column gy-5 gx-3">
      <div class="col-12 col-md-9">
        <div class="row gx-3 text-center" v-if="cartLength !== 0">
          <div class="col-4">
            <div class="step rounded-circle bg-info text-white mb-2">
              <h6>1</h6>
            </div>
            <p class="m-0">確認訂單</p>
          </div>
          <div class="col-4 text-gray">
            <div class="step rounded-circle border mb-2">
              <h6>2</h6>
            </div>
            <p class="m-0">填寫資料</p>
          </div>
          <div class="col-4 text-gray">
            <div class="step rounded-circle border mb-2">
              <h6>3</h6>
            </div>
            <p class="m-0">付款</p>
          </div>
        </div>
      </div>
      <div class="col-12">
        <template v-if="cartLength !== 0">
          <div class="row mt-3">
            <div class="col-12 col-lg-8">
              <div class="mb-3">
                <div class="px-3">
                  <div class="row text-center d-none d-md-flex mb-2 fw-semibold">
                    <div class="col-2"></div>
                    <div class="col-3 text-start">商品名稱</div>
                    <div class="col-4">數量</div>
                    <div class="col-2">金額</div>
                    <div class="col-1"></div>
                  </div>
                  <ul v-for="item in cart.carts" :key="item.id"
                    class="row list-unstyled align-items-center
                    py-3 position-relative mb-0 border-bottom border-dark">
                    <li class="col-5 col-md-2">
                      <div class="product-img">
                        <img :src="item.product.imageUrl" alt="商品圖片" class="object-fit-cover"
                          @click="gotoProduct(item.product.id)"
                          @keydown="gotoProduct(item.product.id)">
                      </div>
                    </li>
                    <li class="col-5 col-md-9 product-content">
                      <div class="row flex-column align-items-center flex-md-row
                        list-unstyled gy-2">
                        <div class="col col-md-5 product-title">
                          <p class="mb-0 fs-6">{{ item.product.title }}</p>
                        </div>
                        <ul class="col col-md-4 list-unstyled d-flex flex-column flex-md-row
                          align-items-start align-items-md-center justify-content-between">
                          <li class="updateNum d-flex align-items-center justify-content-center
                            mb-2 mb-md-0">
                            <div class="input-group border">
                              <label for="number" class="d-none"/>
                              <button @click="updateCart(item, item.qty-1)"
                                :disabled="item.qty <= 1" type="button"
                                class="btn rounded-0 px-2 py-1">
                                <i class="fa-solid fa-minus"/>
                              </button>
                              <input type="number" class="shadow-none form-control text-center"
                                v-model="item.qty"
                                min="1" max="100" id="number"
                                @change="updateCart(item, item.qty)">
                              <button @click="updateCart(item, item.qty+1);"
                                :disabled="item.qty >= 20" type="button"
                                class="btn rounded-0 px-2 py-1">
                                <i class="fa-solid fa-plus"/>
                              </button>
                            </div>
                          </li>
                        </ul>
                        <li class="col col-md-3 product-price text-md-end">
                          NT${{ $filters.currency(item.total) }}
                        </li>
                      </div>
                    </li>
                    <li class="col-2 col-md-1">
                      <div class="delete-icon text-end">
                        <button class="btn px-0" type="button"
                          @click="deleteCartItem(item)">
                          <i class="fa-solid fa-trash text-gray fs-5"/>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row justify-content-between mb-4">
                <div class="col">
                  <p>共 <span class="fw-bold">{{cartLength}}</span> 件商品</p>
                </div>
                <div class="col text-end">
                  <button class="btn btn-sm btn-outline-gray rounded-0" type="button"
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
                  <ul class="list-unstyled mb-5">
                    <li class="text-end d-flex justify-content-between mb-1">
                      <p>小計</p>
                      <p>NT${{ $filters.currency(cart.total) }}</p>
                    </li>
                    <li v-if="cart.final_total !== cart.total"
                      class="text-end d-flex justify-content-between text-muted mb-1">
                      <p>折扣</p>
                      <p>{{ $filters.currency(cart.total-cart.final_total) }}</p>
                    </li>
                    <li v-if="cart.final_total !== cart.total"
                      class="text-end d-flex justify-content-between text-muted">
                      <p>已套用優惠券</p>
                      <p>{{ cart.carts[0].coupon.code }}</p>
                  </li>
                    <li>
                      <label for="coupon" class="d-none"/>
                      <div class="input-group mt-3 mb-1">
                        <input type="text" class="form-control rounded-0"
                          placeholder="請輸入優惠碼"
                          v-model="tempCouponCode" id="coupon">
                        <button class="btn btn-info rounded-0"
                          @click="sendCouponCode">套用</button>
                      </div>
                      <span class="text-danger" v-if="couponWarning">
                        *{{ couponWarning }}
                      </span>
                    </li>
                  </ul>
                  <hr>
                  <li class="text-end d-flex justify-content-between fs-5 fw-semibold mb-3">
                    <p>總計</p>
                    <p>NT${{ $filters.currency(cart.final_total) }}</p>
                  </li>
                  <div class="text-end">
                    <router-link to="/information" class="btn btn-secondary w-100
                      fw-bold rounded-0">
                      下一步
                      <i class="fa-solid fa-angle-right"/>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div v-if="cartLength === 0"
          class="p-5 text-center">
          <i class="fa-solid fa-cart-shopping text-gray mb-5"
            style="font-size: 120px;"/>
          <h5 class="mb-3">購物車目前沒有商品</h5>
          <button class="btn btn-secondary fw-semibold" @click="gotoShop">
            繼續購物
          </button>
        </div>
      </div>
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
