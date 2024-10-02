<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="table-responsive">
    <table class="table text-nowrap">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">Email</th>
          <th scope="col">購買項目</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td scope="row">{{ item.create_at }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, key) in item.products" :key="key">
                品名:{{ product.product.title }} 數量:{{ product.product.num }}
              </li>
            </ul>
          </td>
          <td>{{ $filters.currency(item.total) }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-muted">未付款</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-gray btn-sm" type="button"
                @click="openModal(item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" type="button"
                @click="comfirmDelOrder(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <OrderModal ref="OrderModal"/>
  <PageNavigation :pagination="pagination"
    @update-page="getOrders"/>
</template>

<script>
import OrderModal from '@/components/backend/OrderModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import adminOrderStore from '@/stores/adminOrderStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    OrderModal,
    PageNavigation,
  },
  computed: {
    ...mapState(adminOrderStore, [
      'orders',
      'pagination',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions(adminOrderStore, [
      'getOrders',
      'getOrder',
      'comfirmDelOrder',
    ]),
    openModal(item) {
      this.getOrder(item);
      this.$refs.OrderModal.showModal();
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
