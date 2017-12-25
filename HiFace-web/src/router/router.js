import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import New from '../components/new/New.vue'
import MakeFace from '../components/makeface/MakeFace.vue'
import Index from '../components/Index.vue'

Vue.use(VueResource)
// 配置路由规则
export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/new',
      component: New
    },
    {
      path: '/hot',
      component: New
    },
    {
      path: '/make',
      component: MakeFace
    },
    {
      path: '/',
      component: Index
    }
  ]
})
