import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('adminOrder', {
  state: () => ({
    orders: {},
    tempOrder: {},
    pagination: {},
    isLoading: false,
  }),
  actions: {
    // 取得訂單列表
    getOrders(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;

      axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '訂單列表取得失敗',
            content: '請稍後嘗試',
          });
        });
    },
    // 取得單一訂單
    getOrder(item) {
      this.tempOrder = { ...item };
    },
    // 編輯訂單
    updateOrder(item) {
      // 訂單金額需大於0
      if (item.total > 0) {
        this.isLoading = true;
        this.tempOrder = item;
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;

        axios.put(url, { data: this.tempOrder })
          .then((res) => {
            let messageTitle = '更新成功';
            if (res.data.success) {
              this.getOrders();
              toast.pushMessage({
                style: 'success',
                title: messageTitle,
              });
            } else {
              this.isLoading = false;
              messageTitle = '更新失敗';
              toast.pushMessage({
                style: 'danger',
                title: messageTitle,
                content: res.data.message.join('、'),
              });
            }
          })
          .catch(() => {
            this.isLoading = false;
            toast.pushMessage({
              style: 'danger',
              title: '更新失敗',
              content: '請稍後嘗試',
            });
          });
      } else {
        this.isLoading = false;
        toast.pushMessage({
          style: 'danger',
          title: '金額不正確，請重新輸入',
        });
      }
    },
    // 確認刪除訂單
    comfirmDelOrder(item) {
      Swal.fire({
        title: '確定刪除嗎',
        text: `確定要${item.paid_date}刪除嗎`,
        icon: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.deleteOrder(item);
        }
      });
    },
    // 刪除訂單
    deleteOrder(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;

      axios.delete(url)
        .then((res) => {
          this.getOrders();
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
            title: '刪除失敗',
            content: '請稍後嘗試',
          });
        });
    },
  },
});
