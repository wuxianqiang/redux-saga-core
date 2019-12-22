import { take, put, takeEvery } from '../redux-saga/effects'
import * as types from './types'

function * increment() {
  yield put({ type: types.INCREMENT })
}

export default function* () {
  for (let i = 0; i < 3; i++) {
    const value = yield take(types.INCREMENT_ASYNC)
    console.log(value) // 这个是派发的action
    yield increment() // 生成器执行之后是迭代器
  }
  console.log('只能执行3次')
}

export function* rootSaga () {
  yield takeEvery(types.INCREMENT_ASYNC, increment)
}
