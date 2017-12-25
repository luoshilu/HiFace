export const makefaceGetter = {
  getOption (state) {
    return state.canvasOption
  },
  getCanvas (state) {
    return state.canvas
  },
  getCtx (state) {
    return state.ctx
  },
  getColor (state) {
    return state.color
  },
  getselectImg: state => () => state.img,
  getImglist: state => () => state.imglist,
  getPenSize (state) {
    return state.penSize
  },
  getFontType (state) {
    return state.fontType
  },
  getFontSize (state) {
    return state.fontSize
  }
}
