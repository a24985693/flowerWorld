<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="exampleModalLabel">刪除優惠券</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          確定要刪除 {{ tempCoupon.title }} 嗎?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger"
            @click="$emit('delete-coupon', tempCoupon)">刪除</button>
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
    },
  },
  data() {
    return {
      tempCoupon: {},
    };
  },
  mixins: [modalMixin],
};
</script>
