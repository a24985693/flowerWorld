import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('adminProduct', {
  state: () => ({
    products: [],
    pagination: {},
    tempProduct: {},
    warning: '',
    isNew: false,
    isLoading: false,
    mainLoading: false,
    subLoading: false,
  }),
  actions: {
    // 取得產品列表
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;

      axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '產品列表取得失敗',
            content: '請稍後嘗試',
          });
        });
    },
    // 取得單一產品
    getProduct(isNew, item) {
      this.isNew = isNew;
      if (!this.isNew) {
        this.tempProduct = { ...item };
      } else {
        this.tempProduct = {};
      }
    },
    // 編輯產品/新增產品
    updateProduct(item) {
      this.isLoading = true;
      this.tempProduct = item;

      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        method = 'put';
      }

      axios[method](url, { data: this.tempProduct })
        .then((res) => {
          let messageTitle = this.isNew ? '新增成功' : '更新成功';
          if (res.data.success) {
            this.getProducts();
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
    // 確認刪除產品
    comfirmDelProduct(item) {
      Swal.fire({
        title: '確定刪除嗎',
        text: `確定要${item.title}刪除嗎`,
        icon: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.deleteProduct(item);
        }
      });
    },
    // 刪除產品
    deleteProduct(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;

      axios.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
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
    // 上傳主圖片
    uploadFile(uploadedFile) {
      this.mainLoading = true;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      axios.post(url, formData)
        .then((res) => {
          this.mainLoading = false;
          if (res.data.success) {
            this.warning = '';
            this.tempProduct.imageUrl = res.data.imageUrl;
          } else {
            this.warning = res.data.message;
          }
        })
        .catch(() => {
          this.mainLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '上傳失敗',
            content: '請稍後在嘗試',
          });
        });
    },
    // 上傳副圖片
    uploadSubFile(uploadedFile) {
      this.subLoading = true;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      axios.post(url, formData)
        .then((res) => {
          this.subLoading = false;
          if (res.data.success) {
            this.tempProduct.images.push(res.data.imageUrl);
          }
        })
        .catch(() => {
          this.subLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '上傳失敗',
            content: '請稍後在嘗試',
          });
        });
    },
    // 主圖片連結
    uploadLink(link) {
      this.tempProduct.imageUrl = link;
    },
    // 副圖片連結
    uploadSubLink(link) {
      this.tempProduct.images.push(link);
    },
  },
});
