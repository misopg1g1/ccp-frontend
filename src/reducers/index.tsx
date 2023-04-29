import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import login from './login'
import inventory from './inventory'
import user from './user'

const persistRootConfig = {
    key: 'root',
    whitelist: [
        'inventory',
        'user'
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
        user,
    });

export default () => persistReducer(persistRootConfig, rootReducer());