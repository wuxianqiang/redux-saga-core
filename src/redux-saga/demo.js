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


let arr = [1,2,3,4]
let it = arr[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())
