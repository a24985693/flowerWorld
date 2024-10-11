<template>
  <LoadingSpinner :active="isLoading"/>
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
      <div class="col-12 col-md-9">
        <template v-if="cartLength !== 0">
          <div class="mb-3 border">
            <div class="fs-4 fw-semibold p-3 bg-primary">購物車</div>
            <div class="px-3 py-2">
              <ul v-for="item in cart.carts" :key="item.id"
                class="row list-unstyled align-items-center
                py-3 position-relative mb-0">
                <li class="col-5 col-md-2">
                  <div class="product-img">
                    <img :src="item.product.imageUrl" alt="商品圖片" class="object-fit-cover"
                      @click="gotoProduct(item.product.id)"
                      @keydown="gotoProduct(item.product.id)">
                  </div>
                </li>
                <li class="col-5 col-md-9 product-content">
                  <ul class="row flex-column align-items-center flex-md-row list-unstyled gy-2">
                    <li class="col col-md-5 product-title">
                      <p class="mb-0 fs-6">{{ item.product.title }}</p>
                    </li>
                    <ul class="col col-md-7 list-unstyled d-flex flex-column flex-md-row
                      align-items-start align-items-md-center justify-content-between">
                      <li class="updateNum d-flex align-items-center justify-content-center
                        mb-2 mb-md-0">
                        <label for="number" class="d-none"/>
                        <button @click="updateCart(item, item.qty-1)"
                          :disabled="item.qty <= 1"
                          class="btn" type="button">
                          <i class="fa-solid fa-minus fs-5"/>
                        </button>
                        <input type="number" class="shadow-none" v-model="item.qty"
                          min="1" max="100" id="number"
                          @change="updateCart(item, item.qty)">
                        <button @click="updateCart(item, item.qty+1);"
                          :disabled="item.qty >= 20"
                          class="btn" type="button">
                          <i class="fa-solid fa-plus fs-5"/>
                        </button>
                      </li>
                      <li class="product-price text-end">
                        NT${{ $filters.currency(item.total) }}
                      </li>
                    </ul>
                  </ul>
                </li>
                <div class="col-2 col-md-1">
                  <div class="delete-icon text-end">
                    <button class="btn px-0" type="button"
                      @click="deleteCartItem(item)">
                      <i class="fa-solid fa-trash text-gray fs-5"/>
                    </button>
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <div class="row justify-content-between mb-4">
            <div class="col">
              <button class="btn btn-sm btn-outline-gray" type="button"
                @click="confirmDeleteAll">
                清空購物車
              </button>
            </div>
            <div class="col text-end">
              <p>共 <span class="fw-bold">{{cartLength}}</span> 件商品</p>
            </div>
          </div>
          <div class="row justify-content-end mb-3">
            <ul class="col col-md-6 list-unstyled">
              <li class="text-end d-flex justify-content-between mb-1"
                :class="{'fs-5 fw-semibold mb-3':cart.final_total == cart.total}">
                <p>總計</p>
                <p>NT${{ $filters.currency(cart.total) }}</p>
              </li>
              <li v-if="cart.final_total !== cart.total"
                class="text-end d-flex justify-content-between text-muted mb-1
                border-bottom border-dark mb-2 pb-2">
                <p>已套用優惠券</p>
                <p>{{ cart.carts[0].coupon.code }}</p>
              </li>
              <li v-if="cart.final_total !== cart.total"
                class="text-end d-flex justify-content-between mb-3"
                :class="{'fs-5 fw-semibold':cart.final_total !== cart.total}">
                <p>折扣價</p>
                <p>NT${{ $filters.currency(cart.final_total) }}</p>
              </li>
              <li>
                <label for="coupon" class="d-none"/>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="請輸入優惠碼"
                    v-model="tempCouponCode" id="coupon">
                  <button class="btn btn-outline-blue"
                    @click="sendCouponCode">套用</button>
                </div>
                <span class="text-danger" v-if="couponWarning">
                  *{{ couponWarning }}
                </span>
              </li>
            </ul>
          </div>
          <div class="row justify-content-between fs-5">
            <div class="col-6">
              <a href="#" @click.prevent="returnPage"
                @keydown.prevent="returnPage"
                class="text-decoration-none">
                <i class="fa-solid fa-angle-left"/>
                回到上頁
              </a>
            </div>
            <div class="col text-end">
              <router-link to="/information" class="btn btn-blue fw-bold">
                前往結帳
                <i class="fa-solid fa-angle-right"/>
              </router-link>
            </div>
          </div>
        </template>
        <div v-if="cartLength === 0"
          class="p-5 text-center">
          <i class="fa-solid fa-cart-shopping text-gray mb-5"
            style="font-size: 120px;"/>
          <h5 class="mb-3">購物車目前沒有商品</h5>
          <button class="btn btn-blue fw-semibold" @click="gotoShop">
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
