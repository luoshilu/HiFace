import { SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_REQUEST, TOTAL, SEARCHURI, PAGE, SHOWIMG, SEARCHVAL } from '../constants/searchType'

export const searchMutation = {
  [SEARCH_REQUEST] (state) {
    state.searchState = true
  },
  [SEARCH_SUCCESS] (state, action) {
    state.imgList = action.data
  },
  [SEARCH_FAILURE] (state) {
    state.searchState = 'error'
  },
  [TOTAL] (state, action) {
    state.total = action.total
  },
  [SEARCHURI] (state, action) {
    state.searchUri = action.uri
  },
  [PAGE] (state, action) {
    state.currentPage = action.page
  },
  [SHOWIMG] (state, action) {
    state.showimg = action.img
  },
  [SEARCHVAL] (state, action) {
    state.searchVal = action.val
  }
}
