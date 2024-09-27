import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import emitter from '@/methods/emitter';
import Swal from 'sweetalert2';

export default defineStore('order', {
  state: () => ({
    couponCode: '',
    order: {
      user: {},
    },
    searchOrder: {},
    warning: '',
    isLoading: false,
  }),
  actions: {
    // 建立訂單
    createOrder(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      axios.post(url, { data: item })
        .then((res) => {
          this.isLoading = false;
          router.push(`/checkout/${res.data.orderId}`);
        });
    },
    // 確認建立訂單
    confirmCreateOrder(item) {
      Swal.fire({
        title: '確定表單資料',
        text: '表單送出後將不能修改訂單!',
        icon: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.createOrder(item);
        }
      });
    },
    // 取得訂單
    getOrder(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      axios.get(url)
        .then((res) => {
          this.order = res.data.order;
          const key = Object.keys(res.data.order.products)[0];
          const productKey = res.data.order.products[key];
          if (productKey.coupon) {
            this.couponCode = productKey.coupon.code;
          }
          this.isLoading = false;
        });
    },
    // 付款
    payOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;
      axios.post(url)
        .then((res) => {
          if (res.data.success) {
            this.getOrder(this.order.id);
            this.isLoading = false;
            const messageTitle = '付款成功';
            emitter.emit('push-message', {
              style: 'success',
              title: messageTitle,
              content: '已完成付款',
            });
          }
        });
    },
    // 搜尋訂單
    inquireOrder(id) {
      this.searchOrder = {};
      this.isLoading = true;
      if (id) { // 如果id不為空
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
        axios.get(url)
          .then((res) => {
            if (res.data.order) { // 有正確取得order
              this.searchOrder = res.data.order;
              const key = Object.keys(res.data.order.products)[0];
              const productKey = res.data.order.products[key];
              if (productKey.coupon) {
                this.couponCode = productKey.coupon.code;
              }
              this.isLoading = false;
            } else {
              this.searchOrder = res.data.order;
              this.warning = '訂單號碼輸入錯誤，請重新輸入';
            }
            this.isLoading = false;
          });
      } else {
        this.warning = '訂單號碼不可為空，請輸入訂單號碼';
        this.isLoading = false;
      }
    },
    gotoPay(id) {
      router.push(`/checkout/${id}`);
    },
  },
});
