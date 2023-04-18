import { legacy_createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import persistedReducer from './reducers';
import mySaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default () => {
    let store;
    const middlewares = [
        sagaMiddleware
    ];

    if (process.env.NODE_ENV === 'production') {
        store = legacy_createStore(persistedReducer(), compose(applyMiddleware(...middlewares)));
    } else {
        // dev tools middleware and logger
        middlewares.push(logger);
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = legacy_createStore(persistedReducer(), composeEnhancers(applyMiddleware(...middlewares)));
    }
    const persistor = persistStore(store);
    // then run the saga
    sagaMiddleware.run(mySaga);
    return {store, persistor};
};