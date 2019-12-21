import * as types from './types'

export default {
  increment() {
    return { type: types.INCREMENT }
  },
  incrementAsync() {
    return { type: types.INCREMENT_ASYNC }
  },
  stop() {
    return { type: types.CANCEL_COUNTER }
  }
}
