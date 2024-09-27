<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="tempProduct.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close text-white"
            data-bs-dismiss="modal" aria-label="Close"/>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title"
              placeholder="請輸入標題"
              v-model="tempProduct.title">
          </div>
          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="category" class="form-label">分類</label>
              <input type="text" class="form-control" id="category"
                placeholder="請輸入分類"
                v-model="tempProduct.category">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">單位</label>
              <input type="text" class="form-control" id="unit"
                placeholder="請輸入單位"
                v-model="tempProduct.unit">
            </div>
          </div>
          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-labe">原價</label>
              <input type="number" class="form-control" id="origin_price"
                placeholder="請輸入原價"
                v-model="tempProduct.origin_price">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input type="number" class="form-control" id="price"
                placeholder="請輸入售價"
                v-model="tempProduct.price">
            </div>
          </div>
          <hr>

          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea type="text" class="form-control" id="description"
              placeholder="請輸入產品描述"
              v-model="tempProduct.description"/>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea type="text" class="form-control" id="content"
              placeholder="請輸入產品說明內容"
              v-model="tempProduct.content"
              style="white-space: pre;"/>
          </div>
          <div class="mb-5">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
                v-model="tempProduct.is_enabled">
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
          <hr>
          <!-- 上傳主圖片 -->
          <div class="mainImg my-5">
            <div class="mb-5">
              <label for="imageUrl" class="form-label w-100">輸入主圖片網址
                <div class="mb-3 input-group">
                  <input type="text" class="form-control" id="imageUrl"
                    placeholder="請輸入圖片連結" ref="inputLink">
                  <button type="button" class="btn btn-secondary"
                    @click="uploadLink">
                    新增圖片
                  </button>
                </div>
              </label>
              <label for="customFile" class="form-label w-100">或上傳主圖片</label>
              <i class="fas fa-spinner fa-spin" v-if="mainLoading"/>
              <input type="file" id="customFile" class="form-control mb-3"
                @change="uploadFile" ref="inputFile">
            </div>
            <p v-if="warning" class="text-danger">{{ warning }}</p>
            <div class="row justify-content-center" v-if="tempProduct.imageUrl">
              <div class="col-md-6">
                <div class="ratio ratio-1x1">
                  <img class="img-fluid object-fit-cover" alt="主圖片"
                  :src="tempProduct.imageUrl">
                </div>
                <div class="mb-3 input-group">
                  <input type="url" class="form-control"
                    placeholder="請輸入連結" v-model="tempProduct.imageUrl">
                  <button type="button" class="btn btn-outline-danger"
                    @click="tempProduct.imageUrl = '';">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <!-- 上傳副圖片 -->
          <div class="subImg my-5">
            <div class="mb-5">
            <label for="subImageUr" class="form-label w-100">輸入副圖片網址</label>
            <div class="mb-3 input-group">
              <input type="text" class="form-control" id="subImageUr"
                placeholder="請輸入副圖片連結" ref="inputSubLink">
              <button type="button" class="btn btn-secondary"
                @click="uploadSubLink">
                新增圖片
              </button>
            </div>
            <label for="customSubFile" class="form-label w-100">或上傳副圖片</label>
            <i class="fas fa-spinner fa-spin" v-if="subLoading"/>
            <input type="file" id="customSubFile" class="form-control mb-3"
              @change="uploadSubFile" ref="inputSubFile">
            </div>
            <div class="row" v-if="tempProduct.images">
              <div v-for="(image, key) in tempProduct.images" :key="key"
              class="col-md-4 mb-3 ">
                <div class="ratio ratio-1x1">
                  <img class="img-fluid object-fit-cover" alt="副圖片" :src="image">
                </div>
                <div class="input-group">
                  <input type="url" class="form-control"
                    placeholder="請輸入連結" v-model="tempProduct.images[key]">
                  <button type="button" class="btn btn-outline-danger"
                    @click="tempProduct.images.splice(key, 1)">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary"
            @click="$emit('update-product', tempProduct)">確認</button>
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
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
  },
  props: {
    product: {},
  },
  data() {
    return {
      tempProduct: {},
      warning: '',
      mainLoading: false,
      subLoading: false,
    };
  },
  methods: {
    uploadFile() {
      this.mainLoading = true;
      const uploadedFile = this.$refs.inputFile.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          this.mainLoading = false;
          if (res.data.success) {
            this.warning = '';
            this.tempProduct.imageUrl = res.data.imageUrl;
          } else {
            this.warning = res.data.message;
          }
          this.$refs.inputFile.value = '';
        });
    },
    uploadSubFile() {
      this.subLoading = true;
      const uploadedFile = this.$refs.inputSubFile.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          this.subLoading = false;
          if (res.data.success) {
            this.tempProduct.images.push(res.data.imageUrl);
          }
          this.$refs.inputSubFile.value = '';
        });
    },
    uploadLink() {
      this.tempProduct.imageUrl = this.$refs.inputLink.value;
      this.$refs.inputLink.value = '';
    },
    uploadSubLink() {
      this.tempProduct.images.push(this.$refs.inputSubLink.value);
      this.$refs.inputSubLink.value = '';
    },
  },
  mixins: [modalMixin],
};
</script>
