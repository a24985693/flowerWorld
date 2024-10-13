<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title d-flex flex-column justify-content-center text-center">
    <h3>付款</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-light">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          付款
        </li>
      </ol>
    </nav>
  </section>
  <div class="container checkout">
    <div class="row justify-content-center mb-5">
      <div class="col col-md-7">
        <div class="row gx-3 text-center">
          <div class="col-4 text-gray">
            <div class="step rounded-circle border mb-2">
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
          <div class="col-4">
            <div class="step rounded-circle bg-info text-white mb-2">
              <h6>3</h6>
            </div>
            <p class="m-0">付款</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4" v-if="!order.is_paid">
      <div class="col-12 col-lg-8">
        <div class="border border-2 border-info">
          <div class="w-100 bg-info text-white fs-5 text-center py-2">
            訂單明細
          </div>
          <div class="py-4 px-3">
            <div class="row border-bottom py-2">
              <div class="col-12 col-sm-4 fw-semibold">訂單編號</div>
              <div class="col-12 col-sm-8">{{ order.id }}</div>
            </div>
            <div class="row border-bottom py-2">
              <div class="col-12 col-sm-4 fw-semibold">Email</div>
              <div class="col-12 col-sm-8">{{ order.user.email }}</div>
            </div>
            <div class="row border-bottom py-2">
              <div class="col-12 col-sm-4 fw-semibold">收件人姓名</div>
              <div class="col-12 col-sm-8">{{ order.user.name }}</div>
            </div>
            <div class="row border-bottom py-2">
              <div class="col-12 col-sm-4 fw-semibold">收件人姓名</div>
              <div class="col-12 col-sm-8">{{ order.user.name }}</div>
            </div>
            <div class="row border-bottom py-2">
              <div class="col-12 col-sm-4 fw-semibold">收件人電話</div>
              <div class="col-12 col-sm-8">{{ order.user.tel }}</div>
            </div>
            <div class="row border-bottom py-2">
              <div class="col-12 col-sm-4 fw-semibold">收件人地址</div>
              <div class="col-12 col-sm-8">{{ order.user.address }}</div>
            </div>
            <div class="row border-bottom py-2">
              <div class="col-12 col-sm-4 fw-semibold">留言</div>
              <div class="col-12 col-sm-8">{{ order.message }}</div>
            </div>
            <div class="row border-bottom py-2 mb-4">
              <div class="col-12 col-sm-4 fw-semibold">付款狀態</div>
              <div class="col-12 col-sm-8">
                <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </div>
            </div>
            <div class="row flex-column flex-md-row" v-if="!order.is_paid">
              <div class="col-12">
                <i class="fa-solid fa-triangle-exclamation me-2"/>
                <span class=" fw-semibold">訂單尚未完成!</span>
                <p>確認訂單內容後，點擊付款即完成訂單!</p>
              </div>
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
            <div v-for="item in order.products" :key="item.id"
              class="list-unstyled border-bottom mb-0 py-2 mb-2">
              <div class="row justify-content-center gy-2">
                <p class="col-5 mb-0">{{ item.product.title }}</p>
                <p class="col-2 mb-0">x{{ item.qty }}</p>
                <p class="col-5 mb-0 text-end">
                  NT${{ $filters.currency(item.total) }}
                </p>
              </div>
            </div>
            <ul class="list-unstyled d-flex justify-content-between mb-1">
              <li>小計</li>
              <li>{{ originalTotal }}</li>
            </ul>
            <ul v-if="couponCode"
              class="list-unstyled text-muted d-flex justify-content-between mb-1">
              <li>折扣</li>
              <li>{{ originalTotal - order.total }}</li>
            </ul>
            <ul v-if="couponCode"
              class="list-unstyled text-muted d-flex justify-content-between mb-1">
              <li>已使用優惠券</li>
              <li>{{ couponCode }}</li>
            </ul>
            <hr>
            <ul class="list-unstyled d-flex justify-content-between mb-3 fs-5 fw-medium">
              <li>總計</li>
              <li>NT${{ $filters.currency(order.total) }}</li>
            </ul>
            <button type="button" class="btn btn-secondary w-100 fw-bold rounded-0"
              @click="payOrder">
              確認付款
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row py-5 gy-3 justify-content-center bg-lightbrown" v-else>
      <div class="col-12 text-center">
        <i class="fa-regular fa-circle-check text-info mb-3"/>
        <h3 class="mb-4">付款完成</h3>
        <div class="mb-3">
          <span>訂單編號：</span>
          <span ref="orderId">{{ order.id }}</span>
          <button class="btn py-0 fs-5" @click="copyOrderId" ref="copyBtn">
            <i class="fa-solid fa-copy"/>
          </button>
        </div>
        <p>感謝您的訂購！您的訂單已成功付款，我們將盡快為您安排配送。</p>
      </div>
      <div class="col-12 text-center">
        <button class="btn btn-outline-gray rounded-0 ms-3"
          @click="returnIndex">
          回到首頁
        </button>
        <button class="btn btn-secondary rounded-0 ms-3"
          @click="gotoShop">
          繼續購物
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
import toastStore from '@/stores/toastStore';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(orderStore, ['couponCode', 'order', 'isLoading', 'originalTotal']),
  },
  methods: {
    ...mapActions(cartStore, ['returnIndex', 'gotoShop']),
    ...mapActions(orderStore, ['getOrder', 'payOrder']),
    ...mapActions(toastStore, ['pushMessage']),
    copyOrderId() {
      navigator.clipboard.writeText(this.$refs.orderId.textContent);
      const messageTitle = '複製成功';
      this.pushMessage({
        style: 'success',
        title: messageTitle,
        content: '已複製',
      });
    },
  },
  created() {
    this.getOrder(this.$route.params.orderId);
  },
};
</script>
