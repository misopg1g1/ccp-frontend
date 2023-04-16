import {takeLatest, call, put} from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants/actionTypes';
import {login} from '../api/login';

function* loginSaga({credentials}) {
    try {
        const body = {...credentials}
        const {data} = yield call(login, body)
        if (data.error) {
            const error = { data }
            throw { data }
        }
        yield put({ type: LOGIN_SUCCESS, token: data.access_token, userData: data.data })
    } catch (error) {
        yield put({type: LOGIN_FAIL, error: error.data});
    }
}

export default function* watcherSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
}