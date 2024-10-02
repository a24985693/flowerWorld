import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('adminCoupon', {
  state: () => ({
    coupons: [],
    tempCoupon: {},
    pagination: {},
    isNew: false,
    isLoading: false,
  }),
  actions: {
    // 取得優惠券列表
    getCoupons(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;

      axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '優惠券列表取得失敗',
            content: '請稍後嘗試',
          });
        });
    },
    // 取的單一優惠券
    getCoupon(isNew, item) {
      this.isNew = isNew;
      if (!isNew) {
        this.tempCoupon = { ...item };
      } else {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      }
    },
    // 編輯優惠券/新增優惠券
    updateCoupon(item) {
      this.isLoading = true;
      this.tempProduct = item;

      // 判斷編輯按紐或新增按鈕
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let method = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        method = 'put';
      }

      axios[method](url, { data: this.tempProduct })
        .then((res) => {
          let messageTitle = this.isNew ? '新增成功' : '更新成功';
          if (res.data.success) {
            this.getCoupons();
            toast.pushMessage({
              style: 'success',
              title: messageTitle,
            });
          } else {
            this.isLoading = false;
            messageTitle = this.isNew ? '新增失敗' : '更新失敗';
            toast.pushMessage({
              style: 'danger',
              title: messageTitle,
              content: res.data.message.join('、'),
            });
          }
        })
        .catch(() => {
          this.isLoading = false;
          const messageTitle = this.isNew ? '新增失敗' : '更新失敗';
          toast.pushMessage({
            style: 'danger',
            title: messageTitle,
            content: '請稍後嘗試',
          });
        });
    },
    // 確認刪除優惠券
    comfirmDelCoupon(item) {
      Swal.fire({
        title: '確定刪除嗎',
        text: `確定要${item.title}刪除嗎`,
        icon: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.deleteCoupon(item);
        }
      });
    },
    // 刪除優惠券
    deleteCoupon(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;

      axios.delete(url)
        .then((res) => {
          this.getCoupons();
          if (res.data.success) {
            toast.pushMessage({
              style: 'success',
              title: '刪除成功',
            });
          } else {
            this.isLoading = false;
            toast.pushMessage({
              style: 'danger',
              title: '刪除失敗',
              content: res.data.message.join('、'),
            });
          }
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '優惠券刪除失敗',
            content: '請稍後嘗試',
          });
        });
    },
  },
});
