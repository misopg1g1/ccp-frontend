import {fork} from 'redux-saga/effects'
import login from './login'
import inventory from './inventory'
import user from './user'
import product from './product'

export default function* root() {
    yield fork(login)
    yield fork(inventory)
    yield fork(user)
    yield fork(product)
}