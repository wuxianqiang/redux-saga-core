import { take, call, put } from 'redux-saga/effects'
import * as types from './types'
import Api from './api'

function* login(username, password) {
  try {
    const token = yield call(Api.login, username, password)
    console.log(token)
    return token
  } catch (error) {
    console.log(error)
    yield put({ type: types.LOGIN_ERROR, error })
  }
}

// 监听登录
export default function* () {
  // 登录退出是一直可以持续的
  while (true) {
    let { payload: { username, password } } = yield take(types.LOGIN_REQUEST)
    // 表单输入的用户名和密码，然后调接口
    const token = yield call(login, username, password)
    if (token) {
      // 登录成功
      yield put({ type: types.LOGIN_SUCCESS, payload: token })
      // 登录成功之后就可以监听退出登录
      yield take(types.LOGIN_OUT)
      yield put({ type: types.LOGOUT_SUCCESS })
    }
  }
}
