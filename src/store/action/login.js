import * as types from '../types'

export default {
  login(username, password) {
    return { type: types.LOGIN_REQUEST, payload: { username, password } }
  },
  logout() {
    return { type: types.LOGIN_OUT }
  }
}
