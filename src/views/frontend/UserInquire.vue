<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title d-flex flex-column justify-content-center text-center">
    <h3>訂單查詢</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-light">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          訂單查詢
        </li>
      </ol>
    </nav>
  </section>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col-12 col-md-7">
        <label for="orderId" class="d-none"/>
        <div class="input-group">
          <input type="text" class="form-control" id="orderId"
            placeholder="請輸入訂單號碼" v-model="orderId">
          <button class="btn btn-blue" type="button"
            @click="sendSearchOrder">
            查詢
          </button>
        </div>
      </div>
    </div>
    <div class="row flex-column-reverse justify-content-center align-items-center
      gy-5 gx-md-5" v-if="searchOrder !== null && searchOrder.id" >
      <div class="col-12 col-md-7">
        <h4 class="mb-3">訂單明細</h4>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">訂單編號</div>
          <div class="col-12 col-sm-8">{{ searchOrder.id }}</div>
        </div>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">Email</div>
          <div class="col-12 col-sm-8">{{ searchOrder.user.email }}</div>
        </div>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">收件人姓名</div>
          <div class="col-12 col-sm-8">{{ searchOrder.user.name }}</div>
        </div>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">收件人姓名</div>
          <div class="col-12 col-sm-8">{{ searchOrder.user.name }}</div>
        </div>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">收件人電話</div>
          <div class="col-12 col-sm-8">{{ searchOrder.user.tel }}</div>
        </div>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">收件人地址</div>
          <div class="col-12 col-sm-8">{{ searchOrder.user.address }}</div>
        </div>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">留言</div>
          <div class="col-12 col-sm-8">{{ searchOrder.message }}</div>
        </div>
        <div class="row border-bottom py-2">
          <div class="col-12 col-sm-4 fw-semibold">付款狀態</div>
          <div class="col-12 col-sm-8">
            <span v-if="!searchOrder.is_paid" class="text-danger">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </div>
        </div>
        <div class="row py-2 align-items-center">
          <div class="col-8 fw-semibold">商品明細</div>
          <div class="col-4 fw-semibold text-end">
            <button class="btn btn-primary rounded-circle" type="button"
              data-bs-toggle="collapse" data-bs-target="#collapseProducts"
              aria-expanded="false" aria-controls="collapseProducts"
              @click="collapseIcon"
              style="padding: 0 7px;">
              <i :class="icon" ref="collapseIcon"/>
            </button>
          </div>
        </div>
        <div class="collapse" id="collapseProducts" ref="collapseProducts">
          <div class="row
            py-2 mb-2 fw-semibold">
            <div class="col-2 d-none d-md-inline-block"></div>
            <div class="col-12 d-md-none text-center">商品資訊</div>
            <div class="col-3 d-none d-md-inline-block text-start">品名</div>
            <div class="col-3 d-none d-md-inline-block text-center">數量</div>
            <div class="col-4 d-none d-md-inline-block text-end">小計</div>
          </div>
          <ul v-for="item in searchOrder.products" :key="item.id"
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
            <li class="col-6 fs-5 fw-medium text-end">
              NT${{ $filters.currency(searchOrder.total) }}
            </li>
          </ul>
        </div>
        <div class="row flex-column flex-md-row mt-5" v-if="!searchOrder.is_paid">
          <div class="col-12">
            <i class="fa-solid fa-triangle-exclamation me-2"/>
            <span class=" fw-semibold">訂單尚未完成!</span>
            <p>確認訂單內容後，點擊付款即完成訂單!</p>
          </div>
          <div class="col-12 text-end">
            <button class="btn btn-blue" type="button"
              @click="gotoPay(searchOrder.id)">
              前往付款
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="warning">
      <p class="h5 text-center text-danger">
        {{ warning }}
      </p>
    </div>
  </div>
</template>

<script>
import orderStore from '@/stores/orderStore';
import { mapState, mapActions } from 'pinia';
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      orderId: '',
      collapse: {},
      icon: 'fa-solid fa-caret-down',
    };
  },
  computed: {
    ...mapState(orderStore, ['couponCode', 'searchOrder', 'warning', 'isLoading']),
  },
  methods: {
    ...mapActions(orderStore, ['getOrder', 'gotoPay']),
    sendSearchOrder() {
      const id = this.orderId.trim();
      this.getOrder(id, 'search');
    },
    collapseIcon() {
      if (this.$refs.collapseIcon.className === 'fa-solid fa-caret-down') {
        this.icon = 'fa-solid fa-caret-up';
      } else {
        this.icon = 'fa-solid fa-caret-down';
      }
    },
  },
  mounted() {
    const collapseElement = document.querySelector('.collapse');
    this.collapse = new Collapse(collapseElement);
    this.collapse.hide();
  },
};
</script>
