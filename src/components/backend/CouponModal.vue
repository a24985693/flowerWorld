<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="tempCoupon.id">編輯優惠券</span>
            <span v-else>新增優惠券</span>
          </h5>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">請輸入標題</label>
            <input type="text" class="form-control" id="title"
              v-model="tempCoupon.title">
          </div>
          <div class="mb-3">
            <label for="code">請輸入優惠碼</label>
            <input type="text" class="form-control" id="code"
              v-model="tempCoupon.code">
          </div>
          <div class="mb-3">
            <label for="dueDate">到期日</label>
            <input type="date" class="form-control" id="dueDate"
              v-model="dueDate">
          </div>
          <div class="mb-3">
            <label for="price">請輸入折扣百分比</label>
            <input type="number" class="form-control" id="price"
              v-model="tempCoupon.percent">
          </div>
          <div class="mb-3">
            <input type="checkbox" class="form-check-input" id="is_enabled"
              :true-value="1"
              :false-value="0"
              v-model="tempCoupon.is_enabled">
            <label for="is_enabled">是否啟用</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary"
            @click="$emit('update-coupon', tempCoupon)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    coupon: {},
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      [this.dueDate] = dateAndTime;
    },
    dueDate() {
      this.tempCoupon.due_date = Math.floor(new Date(this.dueDate) / 1000);
    },
  },
  data() {
    return {
      tempCoupon: {},
      dueDate: '',
    };
  },
  mixins: [modalMixin],
};
</script>
