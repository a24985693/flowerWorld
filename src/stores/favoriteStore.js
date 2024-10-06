import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('favorite', {
  state: () => ({
    favorited: JSON.parse(localStorage.getItem('favorite')) || [],
  }),
  actions: {
    // 移除單一收藏
    delFav(product) {
      const array = [];
      this.favorited.forEach((item) => {
        array.push(item.id);
      });
      this.favorited.splice(array.indexOf(product.id), 1);
      localStorage.setItem('favorite', JSON.stringify(this.favorited));

      const messageTitle = '已移除收藏';
      toast.pushMessage({
        style: 'danger',
        title: messageTitle,
        content: `已將${product.title}移除收藏`,
      });
    },
    // 確認清除全部收藏
    confirmClearAll() {
      Swal.fire({
        text: '確定要將清空收藏嗎',
        icon: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.clearAllFav();
        }
      });
    },
    // 清除全部收藏
    clearAllFav() {
      this.favorited = [];
      localStorage.setItem('favorite', JSON.stringify(this.favorited));

      const messageTitle = '已移除收藏';
      toast.pushMessage({
        style: 'danger',
        title: messageTitle,
        content: '已將全部商品移除收藏',
      });
    },
    // 加入收藏及移除收藏的切換
    setFav(product) {
      if (this.favorited.length) {
        const array = [];
        this.favorited.forEach((item) => {
          array.push(item.id);
        });
        if (array.includes(product.id)) {
          this.favorited.splice(array.indexOf(product.id), 1);
        } else {
          this.favorited.push(product);
        }
      } else {
        this.favorited.push(product);
      }
      localStorage.setItem('favorite', JSON.stringify(this.favorited));
    },
    // 切換愛心狀態
    favState(product) {
      const array = [];
      this.favorited.forEach((item) => {
        array.push(item.id);
      });

      if (array.includes(product.id)) {
        return 'fa-solid fa-heart';
      }
      return 'fa-regular fa-heart';
    },
  },
});
