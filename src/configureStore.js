import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import { createBrowserHistory } from 'history';
import persistedReducer from './reducers';
import mySaga from './sagas';

export const history = createBrowserHistory();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default () => {
    let store;
    const middlewares = [
        sagaMiddleware
    ];

    if (process.env.NODE_ENV === 'production') {
        store = createStore(persistedReducer(history), compose(applyMiddleware(...middlewares)));
    } else {
        // dev tools middleware and logger
        middlewares.push(logger);
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = createStore(persistedReducer(history), composeEnhancers(applyMiddleware(...middlewares)));
    }
    const persistor = persistStore(store);
    // then run the saga
    sagaMiddleware.run(mySaga);
    return {store, persistor};
};