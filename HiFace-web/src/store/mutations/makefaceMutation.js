import {GET_CANVAS, CTX, COLOR, USE_PEN, SELECT_IMG, IMGLIST, STATUS, USE_WORD, NOSTATUS, PEN_SIZE, FONT_TYPE, FONT_SIZE, USE_CLEAR} from '../constants/makefaceTypes'

export const makefaceMutation = {
  [GET_CANVAS] (state, action) {
    state.canvas = action.cv
  },
  [CTX] (state, action) {
    state.ctx = action.ctx
  },
  [USE_PEN] (state) {
    state.canvasOption = 'pen'
  },
  [STATUS] (state, action) {
    state.canvasOption = action.status
  },
  [USE_CLEAR] (state) {
    state.canvasOption = 'clear'
  },
  [SELECT_IMG] (state, action) {
    state.img = action.img
  },
  [IMGLIST] (state, action) {
    // 如果为空,移除当前已选择图片,否则添加新图片
    // !action.imglist ? state.imglist.splice(state.imglist.indexOf(state.img.src), 1) : state.imglist.push(action.imglist)
    !action.imglist ? console.log(state.imglist.splice(state.imglist.indexOf(state.img.src), 1)) : state.imglist.push(action.imglist)
  },
  [USE_WORD] (state) {
    state.canvasOption = 'word'
  },
  [COLOR] (state, action) {
    state.color = action.color
  },
  [NOSTATUS] (state) {
    state.canvasOption = null
  },
  [PEN_SIZE] (state, action) {
    state.penSize = action.size
  },
  [FONT_TYPE] (state, action) {
    state.fontType = action.type
  },
  [FONT_SIZE] (state, action) {
    state.fontSize = action.size
  }
}
