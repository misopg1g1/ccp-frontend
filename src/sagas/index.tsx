import {fork} from 'redux-saga/effects'
import login from './login'
import inventory from './inventory'
import user from './user'

export default function* root() {
    yield fork(login)
    yield fork(inventory)
    yield fork(user)
}