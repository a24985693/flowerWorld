<template>
  <LoadingSpinner :active="isLoading"/>
  <section class="page-title d-flex flex-column justify-content-center text-center">
    <h3 class="fs-1 fw-bold text-dark">最新消息</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-center">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-decoration-none text-dark">
            首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          最新消息
        </li>
      </ol>
    </nav>
  </section>
  <div class="container userArticles">
    <div class="row justify-content-center">
      <div class="col-md-10"
        v-for="(item, i) in articles" :key="item.id">
        <div class="card bg-transparent w-100 py-5"
          :class="{ 'articles-border': i+1 !== articles.length }">
          <div class="row g-0" style="cursor: pointer;"
            @click="gotoArticle(item.id)"
            @keydown="gotoArticle(item.id)">
            <div class="col-md-4 position-relative">
              <div class="img-frame h-100 w-100"/>
              <img :src="item.image" alt="文章圖片"
                class="w-100 h-100 object-fit-cover"
                style="min-height: 200px;">
            </div>
            <div class="col-md-8">
              <div class="card-body pt-4 pt-md-3 pb-0 pb-md-3 px-md-5
                h-100 d-flex flex-column">
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">
                  <small class="text-muted">#{{ item.tag }}</small>
                </p>
                <p class="card-text content">
                  {{ item.content }}
                </p>
                <div class="mt-auto ms-auto more">
                  <div class="mb-0 fs-14">
                    查看更多
                    <i class="fa-solid fa-caret-right"/>
                  </div>
                </div>
              </div>
            </div>
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
