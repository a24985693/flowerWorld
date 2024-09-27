import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import Swal from 'sweetalert2';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('cart', {
  state: () => ({
    cart: {},
    cartLength: '',
    couponWarning: '',
    btnLoading: '',
    isLoading: false,
  }),
  actions: {
    // 取得購物車列表
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      axios.get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.cartLength = this.cart.carts.length;
          this.isLoading = false;
        });
    },
    // 修改購物車數量
    updateCart(item, num) {
      this.isLoading = true;
      let quantity = num;
      if (quantity > 20) { // 單品項超過20，數量就調整到20
        quantity = 20;
      } else if (quantity < 1) { // 單品項低於1，數量就調整到1
        quantity = 1;
      }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: quantity,
      };
      axios.put(url, { data: cart })
        .then(() => {
          this.getCart();
          this.isLoading = false;
        });
    },
    // 加入購物車
    addtoCart(item, quantity = 1) {
      // 判斷購物車是否已有存在的商品
      let existingProduct;
      if (!this.cart.carts) {
        this.getCart();
      } else {
        // 已有存在購物車的品項
        existingProduct = this.cart.carts.filter((i) => i.product_id === item.id);
      }
      this.btnLoading = item.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: item.id,
        qty: quantity,
      };
      axios.post(url, { data: cart })
        .then((res) => {
          const { title } = res.data.data.product;
          this.btnLoading = '';
          if (res.data.data.qty > 20) { // 品項數量超過20，updateCart調整品項數量為20
            const messageTitle = '已加入到最大數量';
            toast.pushMessage({
              style: 'warning',
              title: messageTitle,
              content: `購物車內目前已有20件${title}`,
            });
            this.updateCart(existingProduct[0], 20);
          } else {
            const messageTitle = '加入成功';
            toast.pushMessage({
              style: 'success',
              title: messageTitle,
              content: `已將${title}加入購物車`,
            });
            this.getCart();
          }
        });
    },
    // 刪除單品項
    deleteCartItem(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      axios.delete(url)
        .then(() => {
          this.getCart();
          this.isLoading = false;
          const messageTitle = '已移除品項';
          toast.pushMessage({
            style: 'danger',
            title: messageTitle,
            content: `已將${item.product.title}移除`,
          });
        });
    },
    // 清空購物車
    deleteAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      axios.delete(url)
        .then(() => {
          this.getCart();
          this.isLoading = false;
          const messageTitle = '已移除全部品項';
          toast.pushMessage({
            style: 'danger',
            title: messageTitle,
            content: '已將全部品項移除',
          });
        });
    },
    // 確認是否清空購物車
    confirmDeleteAll() {
      Swal.fire({
        text: '確定要將清空購物車嗎',
        icon: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.deleteAll();
        }
      });
    },
    // 加入優惠券
    addCouponCode(couponCode) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const dataCode = { code: couponCode };
      axios.post(url, { data: dataCode })
        .then((res) => {
          if (res.data.success) {
            this.getCart();
            this.couponWarning = '';
          } else {
            this.couponWarning = '找不到優惠券';
          }
          this.isLoading = false;
        });
    },
    // 回上一頁
    returnPage() {
      router.go(-1);
    },
    // 回首頁
    returnIndex() {
      router.push('/index');
    },
    // 前往繼續購物
    gotoShop() {
      router.push('/productsList');
    },
  },
});
