<template>
  <footer class="bg-primary">
    <div class="container py-5">
      <div class="row justify-content-between align-items-center gy-5 gx-3 mb-4 px-3">
        <div class="col-12 col-md-2 text-center">
          <img src="@/assets/images/logo.png" alt="logo" style="max-width: 130px;">
        </div>
        <div class="col-12 col-md-5 col-xl-6">
          <h3 class="fw-bold">想收到最新消息嗎？</h3>
          <h3 class="fw-bold mb-3">立即訂閱！</h3>
          <label for="subscribeEmail" class="d-none"/>
          <div class="input-group">
            <input type="text" class="form-control" id="subscribeEmail"
              placeholder="請輸入電子信箱">
            <button type="button" class="btn btn-blue">訂閱</button>
          </div>
        </div>
        <div class="col-12 col-md-3 col-xl-2 text-center">
          <div class="fs-3">
            <a @click.prevent="" href="#" class="link-dark">
              <i class="bi bi-line mx-2"/>
              <span class="d-none">1</span>
            </a>
            <a @click.prevent="" href="#" class="link-dark">
              <i class="bi bi-facebook mx-2"/>
              <span class="d-none">1</span>
            </a>
            <a @click.prevent="" href="#" class="link-dark">
              <i class="bi bi-instagram mx-2"/>
              <span class="d-none">1</span>
            </a>
          </div>
        </div>
      </div>
      <div class="text-center">
        ⓒ 2024 huahuaworld All rights reserved. 練習用無商業用途 |
        <router-link to="/login">
          後台登入
        </router-link>
      </div>
    </div>
  </footer>
</template>
