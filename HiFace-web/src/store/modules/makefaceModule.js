import { makefaceAction } from '../actions/makefaceAction'
import { makefaceGetter } from '../getters/makefaceGetter'
import { makefaceMutation } from '../mutations/makefaceMutation'

export const makeface = {
  state: {
    canvas: null, // 画布元素
    ctx: null, // 画布
    canvasOption: null, // 当前操作
    color: '#000000', // 颜色
    img: '', // 当前操作的图片
    imglist: [], // 图片列表
    penSize: 10,  // 画笔大小
    fontType: 'serif', // 字体类型
    fontSize: 12 // 字体大小
  },
  actions: makefaceAction,
  getters: makefaceGetter,
  mutations: makefaceMutation
}
