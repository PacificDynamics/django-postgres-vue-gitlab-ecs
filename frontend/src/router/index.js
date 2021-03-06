import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '@/views/Home.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/Services.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/Chat.vue'),
      children: [
        {
          path: '/chat/:room',
          name: 'Room',
          component: () => import('@/views/RoomVuex.vue'),
        },
      ]
    },
  ]
})

export default router;