import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export default defineStore('article', {
  state: () => ({
    pagination: {},
    article: {},
    articles: {},
    isLoading: false,
  }),
  actions: {
    getArticle(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${id}`;
      axios.get(url)
        .then((res) => {
          this.article = res.data.article;
          this.isLoading = false;
        });
    },
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
        });
    },
    getContent(item, i) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${item.id}`;
      axios.get(url)
        .then((res) => {
          this.articles[i].content = res.data.article.content;
          this.isLoading = false;
        });
    },
    gotoArticle(id) {
      router.push(`/article/${id}`);
    },
  },
});
