<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="article.id">編輯文章</span>
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
                v-model="article.tag">
            </div>
            <div class="mb-3">
              <label for="title">請輸入標題</label>
              <input type="text" class="form-control" id="title"
                v-model="article.title">
            </div>
            <div class="mb-3">
              <label for="author">請輸入作者</label>
              <input type="text" class="form-control" id="author"
                v-model="article.author">
            </div>
            <div class="mb-3">
              <label for="content">請輸入內容</label>
              <textarea type="text" class="form-control" id="content"
                v-model="article.content"/>
            </div>
            <div class="mb-3">
              <label for="create_at">創作日期</label>
              <input type="date" class="form-control" id="create_at"
                v-model="createdAt">
            </div>
            <div class="mb-3">
              <input type="checkbox" class="form-check-input" id="is_public"
                v-model="article.isPublic">
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
                  @click="sendUploadLink">
                  新增圖片
                </button>
              </div>
            </label>
            <label for="customFile" class="form-label">或上傳圖片</label>
            <i class="fas fa-spinner fa-spin"  v-if="btnLoading"/>
            <input type="file" id="customFile" class="form-control mb-3"
              @change="sendUploadFile" ref="inputFile">
            </div>
            <div class="row justify-content-center" v-if="article.image">
              <div class="col-md-6">
                <img class="img-fluid object-fit-cover" alt="圖片"
                :src="article.image">
                <div class="mb-3 input-group">
                  <input type="url" class="form-control"
                    placeholder="請輸入連結" v-model="article.image">
                  <button type="button" class="btn btn-outline-danger"
                    @click="article.image = '';">
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
            @click="sendUpdateArticle()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import adminArticleStore from '@/stores/adminArticleStore';
import { mapState, mapActions } from 'pinia';

export default {
  watch: {
    tempArticle() {
      this.article = this.tempArticle;
      const dateAndTime = new Date(this.article.create_at * 1000).toISOString().split('T');
      [this.createdAt] = dateAndTime;
    },
    createdAt() {
      this.article.create_at = Math.floor(new Date(this.createdAt) / 1000);
      this.updateCreateAt(this.article.create_at);
    },
  },
  data() {
    return {
      article: {},
      createdAt: '',
    };
  },
  mixins: [modalMixin],
  computed: {
    ...mapState(adminArticleStore, ['tempArticle', 'btnLoading']),
  },
  methods: {
    ...mapActions(adminArticleStore, [
      'updateArticle',
      'updateCreateAt',
      'uploadFile',
      'uploadLink',
    ]),
    sendUpdateArticle() {
      this.updateArticle(this.article, this.createdAt);
      this.hideModal();
    },
    sendUploadFile() {
      const uploadedFile = this.$refs.inputFile.files[0];
      this.uploadFile(uploadedFile);
    },
    sendUploadLink() {
      this.uploadLink(this.$refs.inputLink.value);
      this.$refs.inputLink.value = '';
    },
  },
};
</script>
