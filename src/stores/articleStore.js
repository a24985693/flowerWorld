import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import toastStore from './toastStore';

const toast = toastStore();

export default defineStore('article', {
  state: () => ({
    pagination: {},
    article: {},
    articles: {},
    isLoading: false,
  }),
  actions: {
    // 取得單一文章
    getArticle(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;

      axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.article = res.data.article;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '文章取得失敗',
          });
        });
    },
    // 取得文章列表
    getArticles(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`;

      axios.get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.articles.forEach((item, i) => {
            this.getContent(item, i);
          });
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '文章取得失敗',
          });
        });
    },
    // 取得文章的content
    getContent(item, i) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${item.id}`;

      axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles[i].content = res.data.article.content;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '文章取得失敗',
          });
        });
    },
    // 到指定文章頁
    gotoArticle(id) {
      router.push(`/article/${id}`);
    },
  },
});
