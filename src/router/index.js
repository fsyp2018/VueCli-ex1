import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import CustomerOrder from '@/components/pages/CustomerOrder';
import Coupon from '@/components/pages/Coupon';
import OrderList from '@/components/pages/OrderList';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'/login',
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children :[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: Coupon,   
          meta: { requiresAuth: true },       
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: OrderList,   
          meta: { requiresAuth: true },       
        },
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children :[
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,          
        },
      ]
    },

  ]
})
