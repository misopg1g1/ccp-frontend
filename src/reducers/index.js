import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import login from './login'

const persistRootConfig = {
    key: 'root',
    whitelist: [

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
        login: persistReducer(loginPersistConfig, login)
    });

export default () => persistReducer(persistRootConfig, rootReducer());