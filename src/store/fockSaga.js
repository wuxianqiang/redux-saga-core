import {take, fork} from 'redux-saga'

function login () {
  return new Promise((resolve, reject) => {
    resolve(100)
  })
}

export default function * () {
  while(true) {
    let result = yield take('REQUEST')
    const task = yield fork(login)
    
    yield take('cancel')
  }
}
