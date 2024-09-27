import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export default defineStore('product', {
  state: () => ({
    product: {},
    preferProducts: [],
    products: [],
    pagination: {},
    ProductsArr: [],
    renderProducts: [],
    newData: [],
    tempCategory: '',
    isLoading: false,
  }),
  actions: {
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      axios.get(url)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
        });
    },
    getPreferProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      axios.get(url)
        .then((res) => {
          this.preferProducts = res.data.products;
        });
    },
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.pagination.category = this.tempCategory || '全部';
          this.products.forEach((item) => {
            this.ProductsArr.push(item);
          });
          this.renderProducts = [...this.ProductsArr];
          this.renderCategory(page);
        });
    },
    renderCategory(page) {
      if (page < this.pagination.total_pages) {
        this.getProducts(page + 1);
      } else {
        if (this.pagination.category !== '全部'
          && this.renderProducts.length === this.ProductsArr.length) {
          this.renderProducts = this.ProductsArr.filter((item) => (
            item.category === this.pagination.category
          ));
        }
        this.newData = [];
        this.renderProducts.forEach((item, i) => {
          if (i % 10 === 0) {
            this.newData.push([]);
          }
          const pagenum = parseInt(i / 10, 10);
          this.newData[pagenum].push(item);
        });
        this.pagination.current_page = 1;
        this.pagination.total_pages = this.newData.length;
        this.sortProducts = this.renderProducts;
        this.ProductsArr = [];
        this.isLoading = false;
      }
    },
    // 產品排序
    sort(price) {
      if (price === 'low') {
        this.renderProducts.sort((a, b) => a.price - b.price);
      } else {
        this.renderProducts.sort((a, b) => b.price - a.price);
      }
      this.renderCategory();
    },
    updateCategory(category) {
      this.tempCategory = category;
    },
    // 轉到產品頁
    gotoProduct(id) {
      router.push(`/product/${id}`);
    },
    getPage(page) {
      this.pagination.current_page = page;
      window.scrollTo(0, 0);
    },
  },
});
