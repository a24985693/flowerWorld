<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="container article">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <h3 class="text-center mb-4">{{ article.title }}</h3>
        <p class="text-center mb-4">
          {{ $filters.date(article.create_at) }}‧
          {{ article.author }}
        </p>
        <img :src="article.image" alt="文章圖片"
          class="w-100 object-fit-cover mb-4"
          style="max-height: 400px">
        <p class="mb-5 content" style="white-space: pre-line;">
          {{ article.content }}
        </p>
        <router-link to="/articlesList">回到列表</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import articleStore from '@/stores/articleStore';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(articleStore, ['article', 'isLoading']),
  },
  methods: {
    ...mapActions(articleStore, ['getArticle']),
  },
  created() {
    this.getArticle(this.$route.params.id);
  },
};
</script>
