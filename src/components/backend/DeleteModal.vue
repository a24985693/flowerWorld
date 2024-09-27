<template>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
    data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="staticBackdropLabel">刪除產品</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          確定要刪除
          {{ tempProduct.category }} - {{ tempProduct.title }} 嗎
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger"
            @click="$emit('delete-product', tempProduct.id)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  props: {
    product: {},
  },
  data() {
    return {
      tempProduct: {
      },
    };
  },
  mixins: [modalMixin],
};
</script>
