
export const searchGetter = {
  getSearchState (state) {
    return state.searchState
  },
  getimgList (state) {
    return state.imgList
  },
  getTotal (state) {
    return state.total
  },
  getCurrentPage (state) {
    return state.currentPage
  },
  getNum (state) {
    return state.num
  },
  getUri (state) {
    return state.searchUri
  },
  getShowImg (state) {
    return state.showimg
  },
  getSearchVal (state) {
    return state.searchVal
  }
}
