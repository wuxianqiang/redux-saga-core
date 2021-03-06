export default function createSagaMiddleware() {
  // 发布订阅
  function createChannel() {
    let observer = {}
    function subscribe (actionType, callback) {
      observer[actionType] = callback;
    }
    function publish (action) {
      // 执行完成会销毁，相当于once
      if (observer[action.type]) {
        let next = observer[action.type]
        // 先删除，再绑定
        delete observer[action.type]
        next(action)
        // 下面这个写法是错误的，先绑定，再删除，白绑定的
        // observer[action.type](action)
        // delete observer[action.type]
      }
    }
    return {subscribe, publish}
  }
  let channel = createChannel()
  function sagaMiddleware({ dispatch, getState }) {
    function run(generator) {
      let it = typeof generator[Symbol.iterator] === 'function' ? generator : generator()
      // let it = generator();
      // 开始执行generator
      function next(nextValue, callback) {
        // 执行yield
        // value={type: 'TAKE', actionType: 传入的type值}
        // next传参会会把参数赋值给yield左边的变量
        const { value: effect, done } = it.next(nextValue)
        if (!done) {
          if (typeof effect[Symbol.iterator] === 'function') {
            run(effect) // 如果是一个迭代器，直接传入run方法执行
            // 不会阻塞代理，里面向下执行
            next()
          } else if(typeof  effect.then === 'function') {
            // 等promise完成再调next
            effect.then(next)
          } else {
            switch (effect.type) {
              case 'TAKE':
                // 要监听某个动作，往下走，没有传处理函数
                // 订阅，等待某个事件的发生
                channel.subscribe(effect.actionType, next) // 当有人派发这个动作会往下走
                break;
              case 'PUT':
                // 直接向参考派发一个动作
                dispatch(effect.action)
                // 继续往下走
                next()
                break;
              case 'FORK':
                let newTask = effect.task()
                run(newTask); // 如果是fork就单独开启一个子进程，
                next(newTask) // 继续往下执行
                break;
              case 'CANCEL':
                // 停止
                effect.task.return('任务直接结束') // iterator调用return就会马上停止
                break;
              case 'CALL':
                effect.fn(effect.args).then(next)
                break;

              case 'CPS':
                // cps不是promise，是回调
                effect.fn(...effect.args, next)
                break;
              case 'ALL':
                // effect.fns.forEach(fn => run(fn)) // 其中可能是异步的
                // 等多有saga执行完成
                // next()
                function times(cb, length) {
                  // 函数调用多少次之后执行
                  let count = 0;
                  return function () {
                    if (++count === length) {
                      cb()
                    }
                  }
                }
                let fns = effect.fns;
                let done = times(next, fns.length); // 执行的数量完成之后调用next
                effect.fns.forEach(fn => run(fn, done));
                break;
              default:
                return;
            }
          }
        } else {
          callback && callback()
        }
      }
      next()
    }
    sagaMiddleware.run = run
    return function (next) {
      return function (action) {
        // action是一个普通对象，包含type属性的
        channel.publish(action) // 通过管道派发一个动作
        next(action)
      }
    }
  }
  
  // 返回中间件
  return sagaMiddleware
}

// 通过一个工厂函数返回一个中件
