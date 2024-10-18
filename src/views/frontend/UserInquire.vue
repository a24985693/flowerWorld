<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title">
    <h2>訂單查詢</h2>
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
          <input type="text" class="form-control rounded-0" id="orderId"
            placeholder="請輸入訂單號碼" v-model="orderId">
          <button class="btn btn-info" type="button"
            @click="sendSearchOrder">
            查詢
          </button>
        </div>
      </div>
    </div>
    <div class="row flex-column-reverse justify-content-center align-items-center
      gy-5 gx-md-5" v-if="searchOrder !== null && searchOrder.id" >
      <div class="col-12 col-md-7">
        <div class="border border-2 border-info">
          <div class="w-100 bg-info text-white fs-5 text-center py-2">
            訂單明細
          </div>
          <div class="py-4 px-3">
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
              <div class="py-4">
                <div v-for="item in searchOrder.products" :key="item.id"
                  class="row justify-content-center border-bottom py-2">
                  <p class="col-5">{{ item.product.title }}</p>
                  <p class="col-2 text-center">x{{ item.qty }}</p>
                  <p class="col-5 text-end">
                    NT${{ $filters.currency(item.total) }}
                  </p>
                </div>
                <div class="my-3">
                  <div class="d-flex justify-content-between mb-1">
                    <p>小計</p>
                    <p>{{ originalTotal }}</p>
                  </div>
                  <div v-if="couponCode"
                   class="text-muted d-flex justify-content-between mb-1">
                    <p>折扣</p>
                    <p>{{ originalTotal - searchOrder.total }}</p>
                  </div>
                  <div v-if="couponCode"
                    class="text-muted d-flex justify-content-between mb-1">
                    <p>已使用優惠券</p>
                    <p>{{ couponCode }}</p>
                  </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between mb-3 fs-5 fw-medium">
                  <p>總計</p>
                  <p>NT${{ $filters.currency(searchOrder.total) }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4" v-if="!searchOrder.is_paid">
              <i class="fa-solid fa-triangle-exclamation me-2"/>
              <span class="fw-semibold">訂單尚未完成!</span>
              <p class="mb-3">確認訂單內容後，點擊付款即完成訂單!</p>
              <div class="text-end">
                <button class="btn btn-secondary fw-bold" type="button"
                  @click="gotoPay(searchOrder.id)">
                  前往付款
                </button>
              </div>
            </div>
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
    ...mapState(orderStore, [
      'couponCode',
      'searchOrder',
      'warning',
      'isLoading',
      'originalTotal',
    ]),
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
