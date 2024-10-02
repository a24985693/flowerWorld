<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="text-end">
    <button type="button" class="btn btn-secondary"
      @click="openModal(true)">
      新增產品
    </button>
  </div>
  <div class="table-responsive">
    <table class="table text-nowrap">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td scope="row">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $filters.currency(item.origin_price) }}</td>
          <td>{{ $filters.currency(item.price) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">不啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-gray btn-sm" type="button"
              @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" type="button"
              @click="comfirmDelProduct(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <PageNavigation :pagination="pagination"
    @update-page="getProducts"/>
  <ProductModal ref="productModal"/>
</template>

<script>
import ProductModal from '@/components/backend/ProductModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import adminProductStore from '@/stores/adminProductStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    ProductModal,
    PageNavigation,
  },
  computed: {
    ...mapState(adminProductStore, [
      'products',
      'pagination',
      'isNew',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions(adminProductStore, [
      'getProducts',
      'getProduct',
      'comfirmDelProduct',
    ]),
    openModal(isNew, item) {
      this.getProduct(isNew, item);
      this.$refs.productModal.showModal();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
