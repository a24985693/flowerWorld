import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { currency, date } from '@/methods/filters';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const pinia = createPinia();

const app = createApp(App);
app.config.globalProperties.$filters = {
  currency, date,
};
AOS.init({
  duration: 1500,
});
app.use(VueAxios, axios);
app.use(router);
app.use(VueSweetalert2);
app.use(pinia);
app.component('LoadingSpinner', Loading);
app.component('VerifyForm', Form);
app.component('VerifyField', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
