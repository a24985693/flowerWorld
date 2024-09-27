<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="tempArticle.id">編輯文章</span>
            <span v-else>新增文章</span>
          </h5>
          <button type="button" class="btn-close text-white"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="modal-body">
            <div class="mb-3">
              <label for="tag">請輸入標籤</label>
              <input type="text" class="form-control" id="tag"
                v-model="tempArticle.tag">
            </div>
            <div class="mb-3">
              <label for="title">請輸入標題</label>
              <input type="text" class="form-control" id="title"
                v-model="tempArticle.title">
            </div>
            <div class="mb-3">
              <label for="author">請輸入作者</label>
              <input type="text" class="form-control" id="author"
                v-model="tempArticle.author">
            </div>
            <div class="mb-3">
              <label for="content">請輸入內容</label>
              <textarea type="text" class="form-control" id="content"
                v-model="tempArticle.content"/>
            </div>
            <div class="mb-3">
              <label for="create_at">創作日期</label>
              <input type="date" class="form-control" id="create_at"
                v-model="createdAt">
            </div>
            <div class="mb-3">
              <input type="checkbox" class="form-check-input" id="is_public"
                v-model="tempArticle.isPublic">
              <label for="is_public">是否公開</label>
            </div>
            <hr>
            <div class="my-5">
            <div class="mb-5">
            <label for="imageUrl" class="form-label w-100">輸入圖片網址
              <div class="mb-3 input-group">
                <input type="text" class="form-control" id="imageUrl"
                  placeholder="請輸入圖片連結" ref="inputLink">
                <button type="button" class="btn btn-secondary"
                  @click="uploadLink">
                  新增圖片
                </button>
              </div>
            </label>
            <label for="customFile" class="form-label">或上傳圖片</label>
            <i class="fas fa-spinner fa-spin"></i>
            <input type="file" id="customFile" class="form-control mb-3"
              @change="uploadFile" ref="inputFile">
            </div>
            <div class="row justify-content-center" v-if="tempArticle.image">
              <div class="col-md-6">
                <img class="img-fluid object-fit-cover" alt="圖片"
                :src="tempArticle.image">
                <div class="mb-3 input-group">
                  <input type="url" class="form-control"
                    placeholder="請輸入連結" v-model="tempArticle.image">
                  <button type="button" class="btn btn-outline-danger"
                    @click="tempArticle.image = '';">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary"
            @click="$emit('update-article', tempArticle)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    article: {},
  },
  watch: {
    article() {
      this.tempArticle = this.article;
      const dateAndTime = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
      [this.createdAt] = dateAndTime;
    },
    createdAt() {
      this.tempArticle.create_at = Math.floor(new Date(this.createdAt) / 1000);
    },
  },
  data() {
    return {
      tempArticle: {},
      createdAt: '',
    };
  },
  mixins: [modalMixin],
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.inputFile.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          this.tempArticle.image = res.data.image;
        });
    },
    uploadLink() {
      this.tempArticle.image = this.$refs.inputLink.value;
      this.$refs.inputLink.value = '';
    },
  },
};
</script>
