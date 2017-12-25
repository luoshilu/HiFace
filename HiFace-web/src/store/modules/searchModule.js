import { searchAction } from '../actions/searchAction'
import { searchGetter } from '../getters/searchGetter'
import { searchMutation } from '../mutations/searchMutation'

export const search = {
  state: {
    searchState: false,
    searchUri: '',
    imgList: [],
    num: 24, // 每页图片数量
    total: 1,
    currentPage: 1, // 当前页数
    showimg: true,
    searchVal: ''
  },
  actions: searchAction,
  getters: searchGetter,
  mutations: searchMutation
}
