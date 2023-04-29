import {takeLatest, call, put} from 'redux-saga/effects';
import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL
} from '../constants/actionTypes'
import { createUser } from '../api/user'

function* createUserSaga({user, token}) {
    try {
        const body = {...user}
        const {data} = yield call(createUser, body, token)
        if (data.error) {
            throw { data }
        }
        yield put({ type: CREATE_USER_SUCCESS, userData: data.data })
    } catch (error: any) {
        yield put({type: CREATE_USER_FAIL, message: error.data});
    }
}

export default function* watcherSaga() {
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}