import {takeLatest, call, put} from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_MESSAGE_ERROR
} from '../constants/actionTypes'
import {login} from '../api/login'

function* loginSaga({credentials}) {
    try {
        const body = {...credentials}
        const {data} = yield call(login, body)
        if (data.error) {
            throw { data }
        }
        yield put({ type: LOGIN_SUCCESS, token: data.access_token, userData: data.data })
    } catch (error: any) {
        error.data.code = 'Error en login'
        yield put({type: LOGIN_FAIL});
        yield put({type: SET_MESSAGE_ERROR, message: error.data})
    }
}

export default function* watcherSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
}