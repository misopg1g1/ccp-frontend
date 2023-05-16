import {fork} from 'redux-saga/effects';
import login from './login';
import inventory from './inventory';
import user from './user';
import product from './product';
import category from './category';
import customer from './customer';
import country from './country';
import visit from './visit';
import seller from "./seller";
import order from './order';

export default function* root() {
    yield fork(login);
    yield fork(inventory);
    yield fork(user);
    yield fork(product);
    yield fork(category);
    yield fork(customer);
    yield fork(country);
    yield fork(visit);
    yield fork(seller);
    yield fork(order); 
}