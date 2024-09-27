<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">編輯訂單</h5>
          <button type="button" class="btn-close text-white"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="modal-body">
            <div class="mb-3">
              <label for="total">請輸入金額</label>
              <input type="num" class="form-control" id="total"
                v-model="tempOrder.total">
            </div>
            <div class="mb-3">
              <input type="checkbox" class="form-check-input" id="is_paid"
                v-model="tempOrder.is_paid">
              <label for="is_paid">是否付款</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary"
            @click="$emit('update-order', tempOrder)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  props: {
    order: {},
  },
  data() {
    return {
      tempOrder: {},
    };
  },
  mixins: [modalMixin],
};
</script>
