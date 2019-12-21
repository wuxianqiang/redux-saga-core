import { take, takeEvery, put, select } from 'redux-saga/effects'
import * as types from './types'
import loginSaga from './loginSaga'

export function* incrementSync() {
  while (true) {
    const action = yield take('*') // 匹配所有的动作
    console.log(action)
    // 如何在saga中获取最新的状态
    let state = yield select(state => state.number)
    // select可以传递一个函数,返回你需要的状态，不传就是所有的状态
    console.log(state)
  }
}

export function* helloSaga() {
  yield loginSaga()
}
