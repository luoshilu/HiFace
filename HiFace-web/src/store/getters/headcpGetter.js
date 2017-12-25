export const headcpGetter = {
  getLoginpage (state) {
    return state.loginPage
  },
  getSignin (state) {
    return state.signin
  },
  getLogining (state) {
    return state.logining
  },
  getSignining (state) {
    return state.signining
  },
  getTip (state) {
    return state.tip
  },
  getLoginState (state) {
    return state.loginState
  },
  getUsername: state => () => state.username,
  getAbout: state => () => state.about,
  getHeadurl: state => () => state.headurl,
  getMovedir: state => () => state.movedir
}
