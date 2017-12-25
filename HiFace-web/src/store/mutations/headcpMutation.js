import {LOGIN, SIGNIN, TIP, CLOSEALL, LOGINING, SIGNINING, LOGINSTATE, USERNAME, ABOUT, HEADURL, MOVEDIR} from '../constants/headcpTypes'

export const headcpMutation = {
  [LOGIN] (state) {
    state.signin = false
    state.loginPage = true
    state.tip = false
  },
  [SIGNIN] (state) {
    state.signin = true
    state.loginPage = false
    state.tip = false
  },
  [TIP] (state) {
    state.signin = false
    state.loginPage = false
    state.tip = true
  },
  [CLOSEALL] (state) {
    state.signin = false
    state.loginPage = false
    state.tip = false
    state.logining = false
    state.signining = false
  },
  [LOGINING] (state) {
    state.logining = !state.logining
  },
  [SIGNINING] (state) {
    state.signining = !state.signining
  },
  [LOGINSTATE] (state) {
    state.loginState = !state.loginState
  },
  [USERNAME] (state, action) {
    state.username = action.username
  },
  [ABOUT] (state, action) {
    state.about = action.about
  },
  [HEADURL] (state, action) {
    state.headurl = action.headurl
  },
  [MOVEDIR] (state, action) {
    state.movedir = action.dir
  }
}
