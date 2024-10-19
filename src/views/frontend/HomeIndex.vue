<template data-bs-spy="scroll" data-bs-target="#userNav" data-bs-offset="0">
  <LoadingSpinner :active="isLoading"/>
  <header class="header position-relative vh-100">
    <div class="blink-star position-relative h-100 w-100">
      <div class="star-1 position-absolute" style="top: 25%; left:40%">
        <div class="d-flex">
          <div class="box-1"></div>
          <div class="box-2"></div>
        </div>
        <div class="d-flex">
          <div class="box-3"></div>
          <div class="box-4"></div>
        </div>
      </div>
      <div class="star-1 position-absolute" style="top: 40%; left:70%">
        <div class="d-flex">
          <div class="box-1"/>
          <div class="box-2"/>
        </div>
        <div class="d-flex">
          <div class="box-3"/>
          <div class="box-4"/>
        </div>
      </div>
      <div class="star-2 position-absolute" style="top: 15%; left:50%">
        <div class="d-flex">
          <div class="box-1"/>
          <div class="box-2"/>
        </div>
        <div class="d-flex">
          <div class="box-3"/>
          <div class="box-4"/>
        </div>
      </div>
      <div class="star-2 position-absolute" style="top: 45%; left:20%">
        <div class="d-flex">
          <div class="box-1"/>
          <div class="box-2"/>
        </div>
        <div class="d-flex">
          <div class="box-3"/>
          <div class="box-4"/>
        </div>
      </div>
      <div class="star-3 position-absolute" style="top: 30%; left:85%">
        <div class="d-flex">
          <div class="box-1"/>
          <div class="box-2"/>
        </div>
        <div class="d-flex">
          <div class="box-3"/>
          <div class="box-4"/>
        </div>
      </div>
      <div class="star-3 position-absolute" style="top: 10%; left:15%">
        <div class="d-flex">
          <div class="box-1"/>
          <div class="box-2"/>
        </div>
        <div class="d-flex">
          <div class="box-3"/>
          <div class="box-4"/>
        </div>
      </div>
    </div>
    <div class="header-text position-absolute text-center text-sm-start">
      <h1 class="header-slogan fs-2 fw-bold mb-3 text-info">
        在花花世界<br>尋找屬於您的花
      </h1>
      <p class="fs-5 mb-4 text-gray d-none d-md-flex">為您的生活增添色彩</p>
      <router-link class="btn btn-outline-info"
        to="/productsList">
        開始探索
        <i class="fa-solid fa-caret-right"/>
      </router-link>
    </div>
  </header>
  <section class="category container my-5 py-5">
    <div class="row text-center g-2">
      <div class="col-12 col-md-7">
        <div class="row g-2">
          <div class="col-12">
            <div class="category-bridalBouquet"
              data-aos="fade-up" data-aos-duration="1100">
              <div class="category-title">
                <h3>捧花</h3>
                <p>Bridal Bouquet</p>
              </div>
              <router-link to="/productsList?category=捧花"
                class="stretched-link"/>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="category-bouquet"
              data-aos="zoom-in" data-aos-duration="1000">
              <div class="category-title">
                <h3>花束</h3>
                <p>Bouquet</p>
              </div>
              <router-link to="/productsList?category=花束"
                class="stretched-link"/>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="category-vase"
              data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
              <div class="category-title">
                <h3>花瓶</h3>
                <p>Vase</p>
              </div>
              <router-link to="/productsList?category=花瓶"
                class="stretched-link"/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="category-driedFlower"
          data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <div class="category-title">
            <h3>乾燥花</h3>
            <p>Dried Flowers</p>
          </div>
          <router-link to="/productsList?category=乾燥花"
            class="stretched-link"/>
        </div>
      </div>
    </div>
  </section>
  <section class="news">
    <div class="container py-5">
      <div class="row align-items-center g-4">
        <div class="col-md-3 text-center">
          <h2 class="title-border-bottom fs-1">News</h2>
        </div>
        <div class="col-md-9">
          <ul class="my-md-5">
            <li v-for="item in articles" :key="item.id"
              class="fw-semibold mb-4">
              <div class="d-flex flex-nowrap"
                @click="gotoArticle(item.id)"
                @keydown="gotoArticle(item.id)">
                <span class="news-link cursor-pointer">
                  {{ item.tag }} | {{ item.title }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <section class="container mt-5 py-5 text-center">
    <h2 class="title-border-bottom mb-5">推薦給您</h2>
    <PreferProduts/>
  </section>
</template>

<script>
import PreferProduts from '@/components/frontend/PreferProduts.vue';
import articleStore from '@/stores/articleStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    PreferProduts,
  },
  data() {
    return {
      swiper: {},
    };
  },
  computed: {
    ...mapState(articleStore, ['articles', 'isLoading']),
  },
  methods: {
    ...mapActions(articleStore, ['getArticles', 'gotoArticle']),
  },
  created() {
    this.getArticles();
  },
};
</script>
