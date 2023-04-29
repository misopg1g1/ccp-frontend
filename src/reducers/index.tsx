import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import login from './login'
import inventory from './inventory'

const persistRootConfig = {
    key: 'root',
    whitelist: [
        'inventory'
    ],
    storage
};

const loginPersistConfig = {
    key: 'login',
    blacklist: ['error'],
    storage
};

const rootReducer = () => 
    combineReducers({
        login: persistReducer(loginPersistConfig, login),
        inventory,
    });

export default () => persistReducer(persistRootConfig, rootReducer());