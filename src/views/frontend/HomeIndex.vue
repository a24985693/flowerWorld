<template data-bs-spy="scroll" data-bs-target="#userNav" data-bs-offset="0">
  <LoadingSpinner :active="isLoading"/>
  <header class="header position-relative vh-100"
    style="margin-top:-80px">
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
    <div class="header-text text-center text-sm-start p-2
      position-absolute translate-middle">
      <h2 class="header-slogan fw-bold mb-3 text-info">
        在花花世界<br>尋找屬於您的花
      </h2>
      <p class="h5 mb-4 text-gray d-none d-md-flex">為您的生活增添色彩</p>
      <router-link class="btn btn-outline-info rounded-0"
        to="/productsList">
        開始探索
        <i class="fa-solid fa-caret-right"/>
      </router-link>
    </div>
  </header>
  <section class="category my-5 py-5">
    <div class="container">
      <div class="row text-center g-2">
        <div class="col-12 col-md-7">
          <div class="category-top"
            data-aos="fade-up" data-aos-duration="1100">
            <div class="card bg-dark text-light border-0 mb-2">
              <img src="@/assets/images/bridalBouquet.avif" alt="捧花圖片"
                class="card-img object-fit-cover h-100">
              <div class="card-img-overlay top-auto text-center">
                <h5 class="card-title fw-bold fs-4">捧花</h5>
                <p class="card-text">Bridal Bouquet</p>
                <button class="btn btn-primary rounded-0 mx-auto" type="button">
                  查看更多
                </button>
              </div>
              <router-link to="/productsList?category=捧花"
                class="stretched-link"/>
            </div>
          </div>
          <div class="row g-2">
            <div class="col-md-6 category-middle">
              <div class="card bg-dark text-light border-0"
                data-aos="zoom-in" data-aos-duration="1000">
                <img src="@/assets/images/bouquet.avif"
                  class="card-img object-fit-cover h-100" alt="花束圖片">
                <div class="card-img-overlay top-auto">
                  <h5 class="card-title fw-bold fs-4">花束</h5>
                  <p class="card-text">Bouquet</p>
                  <button class="btn btn-primary rounded-0 mx-auto" type="button">
                    查看更多
                  </button>
                </div>
                <router-link to="/productsList?category=花束"
                  class="stretched-link"/>
              </div>
            </div>
            <div class="col-md-6 category-middle">
              <div class="card bg-dark text-light border-0"
                data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
                <img src="@/assets/images/vase.avif"
                  class="card-img object-fit-cover h-100" alt="花瓶圖片">
                <div class="card-img-overlay top-auto">
                  <h5 class="card-title fw-bold fs-4">花瓶</h5>
                  <p class="card-text">Vase</p>
                  <button class="btn btn-primary rounded-0 mx-auto" type="button">
                    查看更多
                  </button>
                </div>
                <router-link to="/productsList?category=花瓶"
                  class="stretched-link"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5 category-bottom">
          <div class="card bg-dark text-light border-0"
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <img src="@/assets/images/driedFlower.avif"
              class="card-img object-fit-cover h-100" alt="乾燥花圖片">
            <div class="card-img-overlay top-auto">
              <h5 class="card-title fw-bold fs-4">乾燥花</h5>
              <p class="card-text">Dried Flowers</p>
              <button class="btn btn-primary rounded-0 mx-auto" type="button">
                查看更多
              </button>
            </div>
            <router-link to="/productsList?category=乾燥花"
              class="stretched-link"/>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="news">
    <section class="container py-5">
      <div class="row align-items-center g-4">
        <div class="col-md-3 text-center">
          <h4>News</h4>
        </div>
        <div class="col-md-9">
          <ul class="my-md-5">
            <li v-for="item in articles" :key="item.id"
              class="fw-semibold">
              <div class="d-flex flex-nowrap"
                @click="gotoArticle(item.id)"
                @keydown="gotoArticle(item.id)"
                style="cursor: pointer;">
                <span>{{ item.tag }} | {{ item.title }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <section class="container mt-5 py-5 text-center">
    <h4 class="fs-2 mb-5">推薦給您</h4>
    <div class="overflow-hidden">
      <PreferProduts/>
    </div>
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
    const dpr = window.devicePixelRatio;
    console.log(dpr); // 這會輸出設備的DPR
  },
};
</script>
