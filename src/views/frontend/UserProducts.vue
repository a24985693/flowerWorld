<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title">
    <h2>{{ tempCategory }}</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-light">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          產品
        </li>
      </ol>
    </nav>
  </section>
  <div class="container">
    <div class="products-list row g-4">
      <div class="col-12 col-lg-3">
        <div class="sticky-md-top" style="top:120px">
          <ProductsSidebar/>
        </div>
      </div>
      <div class="col-12 col-lg-9">
        <div class="dropdown mb-3 text-end">
          <button class="btn btn-light btn-sm dropdown-toggle border" type="button"
            id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            排序
          </button>
          <ul class="dropdown-menu rounded-0" aria-labelledby="dropdownMenuLink">
            <li>
              <button class="dropdown-item" @click="sort('low')"
                type="button">
                價錢低到高
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="sort('high')"
                type="button">
                價錢高到低
              </button>
            </li>
          </ul>
        </div>
        <div class="row justify-content-bewtween mb-5 g-4">
          <div class="col-6 col-sm-4"
            v-for="item in newData[pagination.current_page -1]"
            :key="item.id">
            <div class="card product-card w-100 h-100"
              @click.stop="gotoProduct(item.id)"
              @keydown.stop="gotoProduct(item.id)">
              <div class="overflow-hidden position-relative">
                <div class="more-text">
                  查看更多
                </div>
                <div class="ratio">
                  <img :src="item.imageUrl" class="card-img-top object-fit-cover w-100"
                    alt="圖片">
                </div>
              </div>
              <div class="card-body">
                <div class="heart"
                  @click.stop="setFav(item)"
                  @keydown.stop="setFav(item)">
                  <i :class="favState(item)"/>
                </div>
                <h5 class="card-title">{{ item.title }}</h5>
                <div class="d-flex align-items-center">
                  <p class="price me-2" v-if="item.price">
                    NT${{ $filters.currency(item.price) }}
                  </p>
                  <p class="price" v-else>
                    NT${{ $filters.currency(item.origin_price) }}
                  </p>
                  <del v-if="item.origin_price != item.price" class="text-muted">
                    NT${{ $filters.currency(item.origin_price) }}
                  </del>
                </div>
              </div>
              <div class="card-foot">
                <button class="btn btn-sm w-100 btn-outline-info fw-semibold py-2"
                  @click.stop="addtoCart(item)"
                  :disabled="item.id === btnLoading" >
                  <div class="spinner-border spinner-border-sm"
                    role="status"
                    v-if="item.id === btnLoading">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <i class="fa-solid fa-cart-shopping me-1" v-else/>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <PageNavigation :pagination="pagination"
          @update-page="getPage"/>
      </div>
    </div>
  </div>
</template>

<script>
import PageNavigation from '@/components/PageNavigation.vue';
import ProductsSidebar from '@/components/frontend/ProductsSidebar.vue';
import Dropdown from 'bootstrap/js/dist/dropdown';
import productStore from '@/stores/productStore';
import cartStore from '@/stores/cartStore';
import favoriteStore from '@/stores/favoriteStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    PageNavigation,
    ProductsSidebar,
  },
  data() {
    return {
      dropdownList: {},
    };
  },
  computed: {
    ...mapState(productStore, [
      'pagination',
      'tempCategory',
      'newData',
      'isLoading',
    ]),
    ...mapState(cartStore, ['btnLoading']),
  },
  methods: {
    ...mapActions(productStore, [
      'gotoProduct',
      'getProducts',
      'sort',
      'getPage',
    ]),
    ...mapActions(cartStore, ['getCart', 'addtoCart']),
    ...mapActions(favoriteStore, ['setFav', 'favState']),
  },
  created() {
    this.getProducts();
    this.getCart();
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    this.dropdownList = dropdownElementList.map((dropdownToggleEl) => (
      new Dropdown(dropdownToggleEl)
    ));
  },
};
</script>
