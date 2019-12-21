let observer = {};

function take(actionType, listener) {
  observer[actionType] = listener
}

take('ASYNC', () => { console.log('ASYNC') })
function fire(actionType) {
  if (observer[actionType]) {
    observer[actionType]()
    delete observer[actionType]
  }
}

fire('ASYNC')
