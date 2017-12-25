import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {headcp, makeface, search} from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    headcp,
    makeface,
    search
  },
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== 'production'
})

if (module.hot) {
  module.hot.accept(['./modules'], () => {
    const newMutations = require('./modules').default

    store.hotUpdate({
      mutations: newMutations
    })
  })
}

export default store
