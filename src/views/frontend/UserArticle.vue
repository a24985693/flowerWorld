<template>
  <LoadingSpinner :active="isLoading"/>
  <div class="container article mt-5 pt-3">
    <div class="row justify-content-center">
      <div class="col-md-9">
        <h2 class="text-center mb-4">{{ article.title }}</h2>
        <p class="text-center mb-4">
          {{ $filters.date(article.create_at) }}‧
          {{ article.author }}
        </p>
        <img :src="article.image" alt="文章圖片"
          class="w-100 object-fit-cover mb-4">
        <p class="content mb-5">
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
