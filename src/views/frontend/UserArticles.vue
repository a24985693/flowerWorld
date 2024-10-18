<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title">
    <h2>最新消息</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-light">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          最新消息
        </li>
      </ol>
    </nav>
  </section>
  <div class="container articles">
    <div class="row justify-content-center cursor-pointer g-4 py-5"
      :class="{ 'articles-border': i+1 !== articles.length }"
      v-for="(item, i) in articles" :key="item.id"
      @click="gotoArticle(item.id)"
      @keydown="gotoArticle(item.id)">
      <div class="col-md-4">
        <img :src="item.image" alt="文章圖片"
          class="w-100 h-100 object-fit-cover">
      </div>
      <div class="col-md-8 articles-body">
        <div class="d-flex flex-column h-100">
          <h3 class="fs-5">{{ item.title }}</h3>
          <p class="mb-2">
            <small class="text-muted">#{{ item.tag }}</small>
          </p>
          <p class="content">
            {{ item.content }}
          </p>
          <div class="see-more fs-14 mt-auto ms-auto mb-0">
            查看更多
            <i class="fa-solid fa-caret-right"/>
          </div>
        </div>
      </div>
    </div>
    <PageNavigation :pagination="pagination"
      @update-page="getArticles"/>
  </div>
</template>

<script>
import PageNavigation from '@/components/PageNavigation.vue';
import articleStore from '@/stores/articleStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    PageNavigation,
  },
  computed: {
    ...mapState(articleStore, ['articles', 'pagination', 'isLoading']),
  },
  methods: {
    ...mapActions(articleStore, ['getArticles', 'gotoArticle']),
  },
  created() {
    this.getArticles();
  },
};
</script>
