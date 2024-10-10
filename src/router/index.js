import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/backend/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/backend/DashBoard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/backend/ProductList.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/backend/OrderList.vue'),
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/backend/CouponList.vue'),
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('../views/backend/ArticleList.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'user',
    component: () => import('../views/frontend/UserBoard.vue'),
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('../views/frontend/HomeIndex.vue'),
      },
      {
        path: 'productsList',
        name: 'productsList',
        component: () => import('../views/frontend/UserProducts.vue'),
      },
      {
        path: 'product/:productId',
        name: 'product',
        component: () => import('../views/frontend/UserProduct.vue'),
      },
      {
        path: 'articlesList',
        name: 'articlesList',
        component: () => import('../views/frontend/UserArticles.vue'),
      },
      {
        path: 'article/:id',
        name: 'article',
        component: () => import('../views/frontend/UserArticle.vue'),
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('../views/frontend/UserFavorite.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/frontend/UserCart.vue'),
      },
      {
        path: 'information',
        name: 'information',
        component: () => import('../views/frontend/UserInformation.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: 'checkout',
        component: () => import('../views/frontend/UserCheckout.vue'),
      },
      {
        path: 'inquire',
        name: 'inquire',
        component: () => import('../views/frontend/UserInquire.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'index',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_BASE_URL),
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
