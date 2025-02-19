import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import toastStore from './toastStore';

const toast = toastStore();

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
    // 取得單一商品
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;

      axios.get(url)
        .then((res) => {
          this.isLoading = false;
          this.product = res.data.product;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '商品取得失敗',
          });
        });
    },
    // 取得推薦商品
    getPreferProducts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;

      axios.get(url)
        .then((res) => {
          this.preferProducts = res.data.products;
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '推薦商品取得失敗',
          });
        });
    },
    // 取得所有商品
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;

      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.pagination.category = this.tempCategory || '全部';
          // 取得所有商品後分類
          this.products.forEach((item) => {
            this.ProductsArr.push(item);
          });
          this.renderProducts = [...this.ProductsArr];
          this.renderCategory(page);
        })
        .catch(() => {
          this.isLoading = false;
          toast.pushMessage({
            style: 'danger',
            title: '商品取得失敗',
          });
        });
    },
    // 分類商品
    renderCategory(page) {
      // 取得每一頁的商品後，再進行分類
      if (page < this.pagination.total_pages) {
        this.getProducts(page + 1);
      } else {
        this.isLoading = false;
        // 將同分類的商品取出
        if (this.pagination.category !== '全部') {
          this.renderProducts = this.ProductsArr.filter((item) => (
            item.category === this.pagination.category
          ));
        }
        // 將商品分成每十個為一頁
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
      }
    },
    // 產品排序
    sort(price) {
      if (price === 'low') {
        this.renderProducts.sort((a, b) => a.price - b.price);
      } else {
        this.renderProducts.sort((a, b) => b.price - a.price);
      }
      this.ProductsArr = this.renderProducts;
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
