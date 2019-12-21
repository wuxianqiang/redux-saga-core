import {take, fork, cancel} from 'redux-saga/effects'

function getUserInfo () {
  return new Promise((resolve, reject) => {
    resolve(100)
  })
}

export default function * () {
  while(true) {
    yield take('REQUEST')
    const task = yield fork(getUserInfo)
    yield take('cancel')
    yield cancel(task)
  }
}
