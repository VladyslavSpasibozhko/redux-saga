import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducers, rootSaga } from './root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = createSagaMiddleware();
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(middleware)),
);

middleware.run(rootSaga);
