import {fork} from 'redux-saga/effects'
import login from './login'
import inventory from './inventory'

export default function* root() {
    yield fork(login)
    yield fork(inventory)
}