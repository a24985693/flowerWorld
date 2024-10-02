<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="text-end">
    <button class="btn btn-secondary" type="button"
      @click="openModal(true)">新增優惠券
    </button>
  </div>
  <div class="table-responsive">
    <table class="table text-nowrap">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-gray btn-sm" type="button"
                @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" type="button"
                @click="comfirmDelCoupon(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal ref="CouponModal"/>
  <PageNavigation :pagination="pagination"
    @update-page="getCoupons"/>
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import adminCouponStore from '@/stores/adminCouponStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    CouponModal,
    PageNavigation,
  },
  computed: {
    ...mapState(adminCouponStore, [
      'coupons',
      'pagination',
      'isNew',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions(adminCouponStore, [
      'getCoupons',
      'getCoupon',
      'comfirmDelCoupon',
    ]),
    openModal(isNew, item) {
      this.getCoupon(isNew, item);
      this.$refs.CouponModal.showModal();
    },
    openDelModal(item) {
      this.tempCoupon = item;
      this.$refs.DelCouponModal.showModal();
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
