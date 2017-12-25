
import axios from 'axios'
import qs from 'qs'

import { SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_REQUEST, TOTAL, SEARCHURI, PAGE, SHOWIMG, SEARCHVAL } from '../constants/searchType'
export const searchAction = {
  searchimg ({commit, state}, param) {
    commit(SHOWIMG, {
      img: false
    })
    var url = ''
    // 当前状态下查找
    if (param[0] === '' || param[0] === 'page') {
      state.searchUri.uri === 'myFace' ? url = '/search/myFace?name=' + state.searchUri.name + '&search=' + param[1] : url = '/search/' + state.searchUri + '?search=' + param[1]
    // 点击链接查找
    } else if (param === 'new' || param === 'hot') {
      commit(SEARCHURI, {
        uri: param
      })
      commit(SEARCHVAL, {
        val: false
      })
      url = '/search/' + param
    // 查找全部
    } else if (param[0] === 'all') {
      commit(SEARCHURI, {
        uri: ''
      })
      url = '/search?search=' + param[1]
    // 个人图片查找
    } else if (param[0] === 'myFace') {
      url = '/search/' + param[0] + '?name=' + param[1] + '&search='
      commit(SEARCHURI, {
        uri: {uri: param[0], name: param[1]}
      })
      commit(SEARCHVAL, {
        val: false
      })
    } else {
      commit(SEARCHURI, {
        uri: ''
      })
      return
    }
    commit(SEARCH_REQUEST)

    axios.post(url, qs.stringify({page: state.currentPage, num: state.num})).then(function (res) {
      commit(SEARCH_SUCCESS, {
        data: res.data.imgList
      })
      commit(TOTAL, {
        total: res.data.total
      })
    }).catch(function () {
      commit(SEARCH_FAILURE, {
        error: 'error'
      })
    })
  },
  page ({commit, state}, param) {
    commit(PAGE, {
      page: param
    })
  },
  showimg ({commit}, param) {
    commit(SHOWIMG, {
      img: param
    })
  },
  searchVal ({commit}, param) {
    commit(SEARCHVAL, {
      val: param
    })
  }
}
