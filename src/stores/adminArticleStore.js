import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('adminArticle', {
  state: () => ({
    articles: [],
    pagination: {},
    tempArticle: {},
    isNew: false,
    isLoading: false,
    btnLoading: false,
  }),
  actions: {
    // 取得文章列表
    getArticles(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;

      axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '文章列表取得失敗',
            content: '請稍後嘗試',
          });
        });
    },
    // 取得單一文章內容
    getArticle(isNew, item) {
      this.isLoading = true;
      this.isNew = isNew;

      // 如果不是編輯就取得article
      if (!this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        axios.get(url)
          .then((res) => {
            this.isLoading = false;
            this.tempArticle = { ...item };
            this.tempArticle.content = res.data.article.content;
          })
          .catch(() => {
            this.isLoading = false;
            toast.pushMessage({
              style: 'danger',
              title: '文章取得失敗',
              content: '請稍後嘗試',
            });
          });
      } else {
        // 新增文章取得創立時間
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
        };
        this.isLoading = false;
      }
    },
    // 編輯文章/新增文章
    updateArticle(item) {
      this.isLoading = true;
      this.tempArticle = item;

      // 預設文章是新的method使用post，不是新的使用put
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let method = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        method = 'put';
      }

      axios[method](url, { data: this.tempArticle })
        .then((res) => {
          let messageTitle = this.isNew ? '新增成功' : '更新成功';
          if (res.data.success) {
            this.getArticles();
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
    // 更新創立時間
    updateCreateAt(time) {
      this.tempArticle.create_at = time;
    },
    // 確認刪除文章
    comfirmDelArticle(item) {
      Swal.fire({
        title: '確定刪除嗎',
        text: `確定要${item.title}刪除嗎`,
        icon: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '確定',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.deleteArticle(item);
        }
      });
    },
    // 刪除文章
    deleteArticle(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;

      axios.delete(url)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.getArticles();
            toast.pushMessage({
              style: 'success',
              title: '刪除成功',
            });
          } else {
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
    // 上傳圖片檔
    uploadFile(uploadedFile) {
      this.btnLoading = true;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);

      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      axios.post(url, formData)
        .then((res) => {
          this.btnLoading = false;
          this.tempArticle.image = res.data.imageUrl;
        })
        .catch(() => {
          this.btnLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '上傳失敗',
            content: '請稍後嘗試',
          });
        });
    },
    // 上傳圖片連結
    uploadLink(link) {
      this.tempArticle.image = link;
    },
  },
});
