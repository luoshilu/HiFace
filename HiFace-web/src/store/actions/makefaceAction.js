import {GET_CANVAS, COLOR, USE_PEN, SELECT_IMG, IMGLIST, STATUS, USE_WORD, CTX, NOSTATUS, PEN_SIZE, FONT_TYPE, FONT_SIZE, USE_CLEAR} from '../constants/makefaceTypes'
// import { toQueryString } from '../../utils'
// import axios from 'axios'

export const makefaceAction = {
  canvas ({commit, state}, cv) {
    commit(GET_CANVAS, {cv: cv})
  },
  ctx ({commit, state}, ctx) {
    commit(CTX, {ctx: ctx})
  },
  pen ({ commit, state }) {
    commit(USE_PEN, state)
  },
  status ({ commit, state }, status) {
    commit(STATUS, {status: status})
  },
  penSize ({ commit, state }, e) {
    commit(PEN_SIZE, {size: e})
  },
  selectImg ({ commit, state }, img) {
    commit(SELECT_IMG, {img: img})
  },
  imglist ({ commit, state }, imglist) {
    commit(IMGLIST, {imglist: imglist})
  },
  word ({ commit, state }) {
    commit(USE_WORD, state)
  },
  clear ({ commit, state }) {
    commit(USE_CLEAR, state)
  },
  fontType ({ commit, state }, fontType) {
    commit(FONT_TYPE, {type: fontType})
  },
  fontSize ({ commit, state }, fontSize) {
    commit(FONT_SIZE, {size: fontSize})
  },
  color ({ commit, state }, color) {
    commit(COLOR, {color: color})
  },
  nostatus ({ commit, state }) {
    commit(NOSTATUS, state)
  }
}
