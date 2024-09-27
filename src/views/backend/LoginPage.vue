<template>
  <div class="container">
    <form class="row justify-content-center"
      @submit="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3">請先登入</h1>
        <div class="mb-3">
          <label for="inputEmail" class="w-100">Email address</label>
          <input type="email" id="inputEmail" class="form-control"
            v-model="user.username">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="w-100">Password</label>
          <input type="password" id="inputPassword" class="form-control"
            v-model="user.password">
        </div>
        <div class="text-end">
          <button class="btn btn-lg btn-primary" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(url, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/dashboard/products');
          }
        });
    },
  },
};
</script>
