export function take(actionType) {
  return {
    type: 'TAKE',
    actionType
  }
}

export function put(action) {
  return {
    type: 'PUT',
    action
  }
}

// takeEvery相当于开启一个单独的子进程，单独监听actionType
export function * takeEvery(actionType, gen) {
  yield fork(function * () {
    while (true) {
      yield take(actionType);
      yield gen();
    }
  })
}

// 参数是一个生成器
export function fork(gen) {
  return {
    type: 'FORK',
    task: gen
  }
}
