<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title">
    <h2>填寫資料</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-light">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          填寫資料
        </li>
      </ol>
    </nav>
  </section>
  <div class="container">
    <div class="row justify-content-center text-center mb-5">
      <div class="col-4 col-md-3">
        <div class="pay-step border">
          <span>1</span>
        </div>
        <span>確認訂單</span>
      </div>
      <div class="col-4 col-md-3">
        <div class="pay-step bg-info text-white">
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
    <VerifyForm v-slot="{ errors }" @submit="sendCreateOrder">
      <div class="row justify-content-center g-4">
        <div class="col-12 col-lg-8">
          <div class="border border-2 border-info">
            <div class="w-100 bg-info text-white fs-5 text-center py-2">
              填寫資料
            </div>
            <div class="py-4 px-3">
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
              <div>
                <router-link to="/cart"
                  class="fw-semibold link-gray">
                  回上一步
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="border border-2 border-info">
            <div class="w-100 bg-info text-white fs-5 text-center py-2">
              訂單明細
            </div>
            <div class="py-4 px-3">
              <div v-for="item in cart.carts" :key="item.id"
                class="row align-items-center border-bottom py-2">
                <p class="col-5">{{ item.product.title }}</p>
                <p class="col-2 text-center">x{{ item.qty }}</p>
                <p class="col-5 text-end">
                  NT${{ $filters.currency(item.total) }}
                </p>
              </div>
              <div class="my-3">
                <div class="d-flex justify-content-between mb-1">
                  <p>小計</p>
                  <p>NT${{ $filters.currency(cart.total) }}</p>
                </div>
                <div v-if="cart.final_total !== cart.total"
                  class="d-flex justify-content-between text-muted mb-1">
                  <p>折扣</p>
                  <p>{{ $filters.currency(cart.total-cart.final_total) }}</p>
                </div>
                <div v-if="cart.final_total !== cart.total"
                  class="d-flex justify-content-between text-muted">
                  <p>已套用優惠券</p>
                  <p>{{ cart.carts[0].coupon.code }}</p>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between fs-5 fw-semibold mb-3">
                <p>總計</p>
                <p>NT${{ $filters.currency(cart.final_total) }}</p>
              </div>
              <button type="submit" class="btn btn-secondary w-100 fw-bold">
                下一步
                <i class="fa-solid fa-angle-right"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </VerifyForm>
  </div>
</template>

<script>
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
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
    sendCreateOrder() {
      this.confirmCreateOrder(this.form);
    },
  },
  created() {
    this.getCart();
  },
};
</script>
