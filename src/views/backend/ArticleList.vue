<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="text-end">
    <button type="button" class="btn btn-secondary"
      @click="openModal(true)">
      新增文章
    </button>
  </div>
  <div class="table-responsive">
    <table class="table text-nowrap">
      <thead>
        <tr>
          <th>標籤</th>
          <th>標題</th>
          <th width="120">創作時間</th>
          <th width="120">作者</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>{{ item.tag }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.author }}</td>
          <td>
            <span v-if="item.isPublic" class="text-success">公開</span>
            <span v-else class="text-muted">未公開</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-gray btn-sm" type="button"
                @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" type="button"
                @click="comfirmDelArticle(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <PageNavigation :pagination="pagination"
    @update-page="getArticles"/>
  <ArticleModal ref="ArticleModal"/>
</template>

<script>
import ArticleModal from '@/components/backend/ArticleModal.vue';
import PageNavigation from '@/components/PageNavigation.vue';
import adminArticleStore from '@/stores/adminArticleStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    ArticleModal,
    PageNavigation,
  },
  computed: {
    ...mapState(adminArticleStore, [
      'articles',
      'pagination',
      'isNew',
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions(adminArticleStore, [
      'getArticles',
      'getArticle',
      'comfirmDelArticle',
    ]),
    openModal(isNew, item) {
      // 判斷是否新增或編輯並取得文章內容
      this.getArticle(isNew, item);
      this.$refs.ArticleModal.showModal();
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
