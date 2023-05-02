import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import login from "./login";
import inventory from "./inventory";
import user from "./user";
import product from "./product";
import message from "./message";
import category from "./category";

const persistRootConfig = {
  key: "root",
  whitelist: ["inventory", "user", "product"],
  storage,
};

const loginPersistConfig = {
  key: "login",
  blacklist: ["error"],
  storage,
};

const rootReducer = () =>
  combineReducers({
    login: persistReducer(loginPersistConfig, login),
    inventory,
    user,
    product,
    message,
    category,
  });

export default () => persistReducer(persistRootConfig, rootReducer());
