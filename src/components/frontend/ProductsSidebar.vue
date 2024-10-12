<template>
  <div class="list-group list-group-flush d-none d-lg-block" ref="list"
    @click="changeCategory" @keydown="changeCategory">
    <button class="list-group-item list-group-item-action" type="button"
      :class="{ active: category === '全部' }">全部
    </button>
    <button class="list-group-item list-group-item-action" type="button"
      :class="{ active: category === '花束' }">花束
    </button>
    <button class="list-group-item list-group-item-action" type="button"
      :class="{ active: category === '花瓶' }">花瓶
    </button>
    <button class="list-group-item list-group-item-action" type="button"
      :class="{ active: category === '捧花' }">捧花
    </button>
    <button class="list-group-item list-group-item-action" type="button"
      :class="{ active: category === '乾燥花' }">乾燥花
    </button>
  </div>
  <select class="form-select d-block d-lg-none" aria-label="Default select example"
    @change="changeCategory" v-model="category">
    <option value="全部" selected>全部</option>
    <option value="花束">花束</option>
    <option value="花瓶">花瓶</option>
    <option value="捧花">捧花</option>
    <option value="乾燥花">乾燥花</option>
  </select>
</template>

<script>
import productStore from '@/stores/productStore';
import { mapActions } from 'pinia';

export default {
  data() {
    return {
      category: '',
    };
  },
  methods: {
    ...mapActions(productStore, ['updateCategory', 'getProducts']),
    changeCategory(e) {
      if (e.target.value) {
        this.category = e.target.value.trim();
      } else {
        this.category = e.target.textContent.trim();
      }
      this.$router.push({
        name: 'productsList',
        query: {
          category: this.category,
        },
      });
      this.updateCategory(this.category);
      this.getProducts();
    },
  },
  created() {
    this.category = this.$route.query.category || '全部';
    this.updateCategory(this.category);
  },
};
</script>
