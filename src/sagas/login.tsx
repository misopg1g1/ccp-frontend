import {takeLatest, call, put} from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_MESSAGE_ERROR
} from '../constants/actionTypes'
import {login} from '../api/login'
import { handledError } from './handledResponse';

function* loginSaga({credentials}: {credentials: any}) {
    try {
        const body = {...credentials}
        const {data} = yield call(login, body)
        if (data.error) {
            throw { data }
        }
        yield put({ type: LOGIN_SUCCESS, token: data.access_token, userData: data.data })
    } catch (error: any) {
        const message = handledError(error, 'Error de autenticación');
        yield put({type: LOGIN_FAIL});
        yield put({type: SET_MESSAGE_ERROR, message: message})
    }
}

export default function* watcherSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
}