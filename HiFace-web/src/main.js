import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './store'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

import Velocity from 'velocity-animate/velocity.min'

import 'velocity-animate/velocity.ui'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueLazyload from 'vue-lazyload'
import Icon from 'vue-svg-icon/Icon.vue'
import axios from 'axios'
Vue.component('icon', Icon)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://op7fsbip3.bkt.clouddn.com/loading.gif',
  loading: 'http://op7fsbip3.bkt.clouddn.com/loading.gif',
  attempt: 1
})
Vue.use(Element)
Vue.use(Velocity)
Vue.use(VueRouter)

axios.defaults.baseURL = '/api'

// 懒加载路由组件
const Search = resolve => require(['./components/search/Search.vue'], resolve)
const MakeFace = resolve => require(['./components/makeface/MakeFace.vue'], resolve)
const Index = resolve => require(['./components/Index.vue'], resolve)
const Tag = resolve => require(['./components/tag/Tag.vue'], resolve)

// 配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/all',
      component: Search,
      beforeEnter: (to, from, next) => {
        from.path === '/' || from.path === '/index' ? router.app.$store.dispatch('movedir', 'left') : router.app.$store.dispatch('movedir', 'right')
        next()
      }
    },
    {
      path: '/new',
      component: Search,
      beforeEnter: (to, from, next) => {
        from.path === '/' || from.path === '/index' ? router.app.$store.dispatch('movedir', 'left') : router.app.$store.dispatch('movedir', 'right')
        router.app.$store.dispatch('searchimg', 'new')
        next()
      }
    },
    {
      path: '/hot',
      component: Search,
      beforeEnter: (to, from, next) => {
        from.path === '/' || from.path === '/index' ? router.app.$store.dispatch('movedir', 'left') : router.app.$store.dispatch('movedir', 'right')
        router.app.$store.dispatch('searchimg', 'hot')
        next()
      }
    },
    {
      path: '/myFace',
      component: Search,
      beforeEnter: (to, from, next) => {
        from.path === '/' || from.path === '/index' ? router.app.$store.dispatch('movedir', 'left') : router.app.$store.dispatch('movedir', 'right')
        next()
      }
    },
    {
      path: '/make',
      component: MakeFace,
      beforeEnter: (to, from, next) => {
        router.app.$store.dispatch('movedir', 'left')
        next()
      }
    },
    {
      path: '/bq',
      component: Tag,
      beforeEnter: (to, from, next) => {
        from.path === '/make' ? router.app.$store.dispatch('movedir', 'right') : router.app.$store.dispatch('movedir', 'left')
        next()
      }
    },
    {
      path: '/index',
      component: Index,
      beforeEnter: (to, from, next) => {
        router.app.$store.dispatch('movedir', 'right')
        router.app.$store.dispatch('searchimg', '')
        next()
      }
    },
    {
      path: '/',
      component: Index,
      beforeEnter: (to, from, next) => {
        router.app.$store.dispatch('movedir', 'right')
        router.app.$store.dispatch('searchimg', '')
        next()
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/* router.params = {
  stock: 1
} */

new Vue({
  router: router,
  render: h => h(App),
  store
}).$mount('#app')
