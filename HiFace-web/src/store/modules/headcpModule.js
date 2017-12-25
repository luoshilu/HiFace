import { headcpAction } from '../actions/headcpAction'
import { headcpGetter } from '../getters/headcpGetter'
import { headcpMutation } from '../mutations/headcpMutation'

export const headcp = {
  state: {
    loginPage: false, // 登录界面
    signin: false, // 注册界面
    tip: false, // 注册提示界面
    logining: false, // 登录中
    signining: false, // 注册中
    loginState: false, // 登录状态
    username: '',
    about: '',
    headurl: '',
    movedir: '' // 动画移动方向
  },
  actions: headcpAction,
  getters: headcpGetter,
  mutations: headcpMutation
}
