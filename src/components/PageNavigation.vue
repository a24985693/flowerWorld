<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="updatePage(pagination.current_page-1)"
          :class="{ 'disabled': pagination.current_page === 1 }">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{ 'active': page === pagination.current_page }">
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="updatePage(pagination.current_page+1)"
          :class="{ 'disabled': pagination.current_page === pagination.total_pages }" >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {},
  },
  methods: {
    updatePage(page) {
      this.$emit('update-page', page);
      window.scrollTo(0, 0);
    },
  },
};
</script>
