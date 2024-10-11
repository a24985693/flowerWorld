<template>
  <LoadingSpinner :active="isLoading"/>
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
    <div class="row g-5" v-if="!order.is_paid">
      <div class="col-12 col-md-6 bg-lightbrown">
        <div class="py-5 px-3">
          <div class="row border-bottom border-dark border-2
            py-2 mb-2 fw-semibold">
            <div class="col-2 d-none d-md-inline-block"></div>
            <div class="col-12 d-md-none text-center">商品資訊</div>
            <div class="col-3 d-none d-md-inline-block text-start">品名</div>
            <div class="col-3 d-none d-md-inline-block text-center">數量</div>
            <div class="col-4 d-none d-md-inline-block text-end">小計</div>
          </div>
          <ul v-for="item in order.products" :key="item.id"
            class="list-unstyled row border-bottom mb-0 py-3 align-items-center">
            <li class="col-5 col-md-2">
              <div class="position-relative w-100 pt-100">
                <img :src="item.product.imageUrl" alt="商品圖片"
                  class="object-fit-cover position-absolute top-0
                  bottom-0 start-0 end-0 w-100 h-100">
              </div>
            </li>
            <li class="col-7 col-md-10">
              <div class="row justify-content-center gy-2">
                <p class="col-12 col-md-5 mb-0">{{ item.product.title }}</p>
                <p class="col-12 col-md-2 mb-0">x{{ item.qty }}</p>
                <p class="col-12 col-md-5 mb-0 text-md-end">
                  NT${{ $filters.currency(item.total) }}
                </p>
              </div>
            </li>
          </ul>
          <ul v-if="couponCode" class="list-unstyled row justify-content-between pt-3 mb-0">
            <li class="col-6 text-success">已使用優惠券</li>
            <li class="col-6 text-success text-end">{{ couponCode }}</li>
          </ul>
          <ul class="list-unstyled row justify-content-between pt-3 mb-0">
            <li class="col-6 fs-5 fw-medium">總計</li>
            <li class="col-6 fs-5 fw-medium text-end">NT${{ $filters.currency(order.total) }}</li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <h4 class="mb-3">訂單資料</h4>
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
          <div class="col-12 text-end">
            <button class="btn btn-blue" type="button"
              @click="payOrder">
              確認付款
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row py-5 gy-3 justify-content-center bg-lightbrown" v-else>
      <div class="col-12 text-center">
        <i class="fa-regular fa-circle-check text-blue mb-3"/>
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
        <button class="btn btn-info rounded-0 ms-3"
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
    ...mapState(orderStore, ['couponCode', 'order', 'isLoading']),
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
