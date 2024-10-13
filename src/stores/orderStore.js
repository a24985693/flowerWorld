import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import Swal from 'sweetalert2';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('order', {
  state: () => ({
    couponCode: '',
    order: {
      user: {},
    },
    originalTotal: 0,
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
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '訂單建立失敗',
          });
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
    getOrder(id, search) {
      this.isLoading = true;

      if (id) { // 如果id不為空
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
        axios.get(url)
          .then((res) => {
            this.isLoading = false;
            if (res.data.order) {
              // 判斷是搜尋訂單還是取得訂單
              if (search) {
                this.searchOrder = res.data.order;
              } else {
                this.order = res.data.order;
              }
              // 取得優惠券碼
              const key = Object.keys(res.data.order.products)[0];
              const productKey = res.data.order.products[key];
              if (productKey.coupon) {
                this.couponCode = productKey.coupon.code;
              }
            } else {
              this.warning = '訂單號碼輸入錯誤，請重新輸入';
            }
            this.getOriginalTotal(res.data.order);
          })
          .catch(() => {
            this.isLoading = false;
            toast.pushMessage({
              style: 'danger',
              title: '訂單取得失敗',
            });
          });
      } else {
        this.isLoading = false;
        this.warning = '訂單號碼不可為空，請輸入訂單號碼';
      }
    },
    getOriginalTotal(order) {
      const price = Object.values(order.products).map((item) => item.total);
      this.originalTotal = 0;
      price.forEach((item) => {
        this.originalTotal += item;
      });
    },
    // 付款
    payOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;

      axios.post(url)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.getOrder(this.order.id);
            const messageTitle = '付款成功';
            toast.pushMessage({
              style: 'success',
              title: messageTitle,
              content: '已完成付款',
            });
          }
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '付款失敗',
          });
        });
    },
    gotoPay(id) {
      router.push(`/checkout/${id}`);
    },
  },
});
