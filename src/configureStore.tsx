import { legacy_createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import axe from '@axe-core/react';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import persistedReducer from './reducers';
import mySaga from './sagas';
import React from 'react';
import ReactDOM from 'react-dom';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default () => {
    let store;
    const middlewares = [
        sagaMiddleware
    ];

    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        middlewares.push(logger);
        axe(React, ReactDOM, 1000);
    }
    store = legacy_createStore(persistedReducer(), compose(applyMiddleware(...middlewares)));
    const persistor = persistStore(store);
    // then run the saga
    sagaMiddleware.run(mySaga);
    return {store, persistor};
};