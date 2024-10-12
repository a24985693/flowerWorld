<template>
  <footer class="bg-info">
    <div class="container py-5 text-white">
      <div class="row justify-content-between align-items-center g-3">
        <div class="col-12 col-md-6 text-start d-flex flex-column">
          <ul class="list-unstyled">
            <li class="mb-2">0960-999555</li>
            <li class="mb-2">huahuaworld@gamil.com</li>
            <li>台中市南區花花路1號</li>
          </ul>
        </div>
        <div class="col-12 col-md-6">
          <div class="row flex-column">
            <div class="col-12 text-center text-md-end mb-3">
              <div class="fs-3">
                <a @click.prevent="" href="#" class="link-light">
                  <i class="bi bi-line mx-3"/>
                  <span class="d-none">1</span>
                </a>
                <a @click.prevent="" href="#" class="link-light">
                  <i class="bi bi-facebook mx-3"/>
                  <span class="d-none">1</span>
                </a>
                <a @click.prevent="" href="#" class="link-light">
                  <i class="bi bi-instagram mx-3"/>
                  <span class="d-none">1</span>
                </a>
              </div>
            </div>
            <div class="col-12">
              <div class="text-center text-md-end text-primary">
                ⓒ 2024 huahuaworld All rights reserved. 練習用無商業用途 |
                <router-link to="/login" class="link-primary">
                  後台登入
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
