import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

// config
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const dev = process.env.NODE_ENV === 'development';

let middleware = applyMiddleware(sagaMiddleware);

if (dev) {
  middleware = composeWithDevTools(middleware);
}

export const store = createStore(rootReducer(), middleware);

export default () => ({
  store,
  runSaga: sagaMiddleware.run(rootSaga),
});
