<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col col-md-7">
        <div class="row gx-3 text-center">
          <div class="col-4 text-gray">
            <div class="step rounded-circle border mb-2">
              <h6>1</h6>
            </div>
            <p class="m-0">確認訂單</p>
          </div>
          <div class="col-4">
            <div class="step rounded-circle bg-info text-white mb-2">
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
    </div>
    <div class="row g-5 justify-content-center">
      <div class="col-12 col-md-6 cart bg-lightbrown">
        <div class="py-5 px-3">
          <div class="row border-bottom border-dark border-2
            py-2 mb-2 fw-semibold">
            <div class="col-2 d-none d-md-inline-block"></div>
            <div class="col-12 d-md-none text-center">商品資訊</div>
            <div class="col-3 d-none d-md-inline-block text-start">品名</div>
            <div class="col-3 d-none d-md-inline-block text-center">數量</div>
            <div class="col-4 d-none d-md-inline-block text-end">小計</div>
          </div>
          <ul v-for="item in cart.carts" :key="item.id"
            class="row list-unstyled align-items-center border-bottom
            py-3 position-relative mb-0">
            <li class="col-5 col-md-2">
              <div class="product-img">
                <img :src="item.product.imageUrl" alt="商品圖片" class="object-fit-cover"
                  @click="gotoProduct(item.product.id)"
                  @keydown="gotoProduct(item.product.id)">
              </div>
            </li>
            <li class="col-7 col-md-10 product-content">
              <ul class="row flex-column align-items-center flex-md-row list-unstyled gy-2">
                <li class="col col-md-5 product-title">
                  <p class="mb-0 fs-6">{{ item.product.title }}</p>
                </li>
                <li class="col">
                  x{{ item.qty }}
                </li>
                <li class="col product-price text-md-end">
                  NT${{ $filters.currency(item.total) }}
                </li>
              </ul>
            </li>
          </ul>
          <ul class="list-unstyled pt-3 mb-0">
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
          </ul>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <h4 class="mb-3">訂單資料</h4>
        <VerifyForm v-slot="{ errors }" @submit="sendCreateOrder">
          <div class="mb-3">
            <label for="inputEmail" id="emailLabel" class="form-label w-100">Email*</label>
              <VerifyField type="email" class="form-control" id="inputEmail"
                :class="{ 'is-invalid': errors['email'] }"
                rules="email|required" name="email"
                placeholder="請輸入Email"
                v-model="form.user.email"
                aria-label="Email"/>
            <ErrorMessage name="email" class="invalid-feedback"/>
          </div>
          <div class="mb-3">
            <label for="inputName" class="form-label w-100">收件人姓名*</label>
              <VerifyField type=" text" class="form-control" id="inputName"
                :class="{ 'is-invalid': errors['姓名'] }"
                rules="required" name="姓名"
                placeholder="請輸入姓名"
                v-model="form.user.name"/>
            <ErrorMessage name="姓名" class="invalid-feedback"/>
          </div>
          <div class="mb-3">
            <label for="inputPhone" class="form-label w-100">收件人電話*</label>
              <VerifyField type="tel" class="form-control" id="inputPhone"
                :class="{ 'is-invalid': errors['電話'] }"
                rules="required" name="電話"
                placeholder="請輸入電話"
                v-model="form.user.tel"/>
            <ErrorMessage name="電話" class="invalid-feedback"/>
          </div>
          <div class="mb-3">
            <label for="inputAddress" class="form-label w-100">收件人地址*</label>
              <VerifyField type="text" class="form-control" id="inputAddress"
                :class="{ 'is-invalid': errors['地址'] }"
                rules="required" name="地址"
                placeholder="請輸入地址"
                v-model="form.user.address"/>
            <ErrorMessage name="地址" class="invalid-feedback"/>
          </div>
          <div class="mb-4">
            <label for="inputComment" class="form-label w-100">留言
              <textarea type="email" class="form-control" id="inputComment"
                v-model="form.message"/>
            </label>
          </div>
          <div class="row align-items-center">
            <div class="col">
              <router-link to="/cart"
                class="fw-semibold link-gray">
                回上一步
              </router-link>
            </div>
            <div class="col">
              <div class="text-end">
                <button class="btn btn-blue fw-bold" type="submit">
                  送出表單
                </button>
              </div>
            </div>
          </div>
        </VerifyForm>
      </div>
    </div>
  </div>
</template>

<script>
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
import pathStore from '@/stores/pathStore';
import { mapState, mapActions } from 'pinia';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  computed: {
    ...mapState(cartStore, ['cart', 'isLoading']),
  },
  methods: {
    ...mapActions(productStore, ['gotoProduct']),
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(orderStore, ['confirmCreateOrder']),
    ...mapActions(pathStore, ['getPath']),
    sendCreateOrder() {
      this.confirmCreateOrder(this.form);
    },
  },
  created() {
    this.getCart();
    this.getPath(this.$route.fullPath);
  },
};
</script>
