import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component:  () => import('./views/articles/ArticleList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component:  () => import('./views/Login.vue')
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component:  () => import('./views/UserInfo.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( './views/About.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component:  () => import('./views/articles/Detail.vue')
    },
    {
      path: '/messages',
      name: 'messages',
      component:  () => import('./views/MessageList.vue')
    },
  ]
})
