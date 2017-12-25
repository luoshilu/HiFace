import {LOGIN, SIGNIN, TIP, CLOSEALL, LOGINING, SIGNINING, LOGINSTATE, USERNAME, ABOUT, HEADURL, MOVEDIR} from '../constants/headcpTypes'

export const headcpAction = {
  loginPage ({commit}) { // 打开/关闭 登录界面
    commit(LOGIN)
  },
  signin ({commit}) { // 打开/关闭 注册界面
    commit(SIGNIN)
  },
  tip ({commit}) { // 打开/关闭 注册提示界面
    commit(TIP)
  },
  logining ({commit}) { // 状态改变为登录中
    commit(LOGINING)
  },
  signining ({commit}) { // 状态改变为注册中
    commit(SIGNINING)
  },
  closeall ({commit}) { // 关闭所有界面
    commit(CLOSEALL)
  },
  loginState ({commit}) { // 用户是否已经登录
    commit(LOGINSTATE)
  },
  username ({commit}, username) { // 当前用户名
    commit(USERNAME, {username: username})
  },
  setabout ({commit}, about) { // 当前用户名
    commit(ABOUT, {about: about})
  },
  setheadurl ({commit}, headurl) { // 当前用户名
    commit(HEADURL, {headurl: headurl})
  },
  movedir ({commit}, dir) { // 当前用户名
    commit(MOVEDIR, {dir: dir})
  }
}

// import { toQueryString } from '../../utils'
// import axios from 'axios'
