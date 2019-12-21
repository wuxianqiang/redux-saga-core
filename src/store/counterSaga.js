import { take, put } from '../redux-saga/effects'
import * as types from './types'

export default function* () {
  for (let i = 0; i < 3; i++) {
    const value = yield take(types.INCREMENT_ASYNC)
    console.log(value)
    yield put({ type: types.INCREMENT })
  }
  console.log('只能执行3次')
}
