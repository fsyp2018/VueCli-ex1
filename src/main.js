// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhWValidate from 'vee-validate/dist/locale/zh_TW';

import App from './App'
import router from './router'
import './bus';
import currencyFilter from './filters/currency';  //$字號
import dateFilter from './filters/date';  //時間

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_Th',zhWValidate);

Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('date', dateFilter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


router.beforeEach((to, from, next) => {
  console.log('to',to,'from', from,'next', next)
  if(to.meta.requiresAuth){
    const api =`${process.env.APIPATH}/api/user/check`;
    
    axios.post(api).then((response) => {
    console.log(response.data);
    if (response.data.success){      
      next();
    }else{
      next({
        path:'/login',
      });
    }
    });
  }else{
    next();
  }  
})