import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from '../redux-saga'
import reducers from './reducer'
// import { helloSaga } from './sagas'
import helloSaga from './counterSaga'
let sagaMiddleware = createSagaMiddleware()
let store = applyMiddleware(sagaMiddleware)(createStore)(reducers)
sagaMiddleware.run(helloSaga)
export default store
