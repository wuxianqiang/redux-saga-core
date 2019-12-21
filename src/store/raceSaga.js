import { race, call, take, delay, put } from 'redux-saga/effects'
import * as types from './types'

// const delay = ms => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(ms)
//   }, ms);
// })

function* start() {
  while (true) {
    yield call(delay, 1000)
    yield put({ type: types.INCREMENT })
  }
}

export default function* () {
  yield race({
    start: call(start),
    // 如果监听到CANCEL_COUNTER表示完成，有一个任务完成，其他任务会取消掉
    stop: take(types.CANCEL_COUNTER)
  })
}
