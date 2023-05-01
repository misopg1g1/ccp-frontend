import {takeLatest, call, put} from 'redux-saga/effects';
import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    SET_MESSAGE_ERROR,
    SET_MESSAGE_SUCCESS,
} from '../constants/actionTypes'
import { createUser } from '../api/user'

function* createUserSaga({user, token}) {
    try {
        const body = {...user}
        const {data} = yield call(createUser, body, token)

        if (data.error) {
            throw { data }
        }
        yield put({ type: CREATE_USER_SUCCESS })
        data.code = 'Proceso exitoso'
        yield put({ type: SET_MESSAGE_SUCCESS, message: data})
    } catch (error: any) {
        error.data.code = 'Error creando el usuario'
        yield put({type: CREATE_USER_FAIL});
        yield put({type: SET_MESSAGE_ERROR, message: error.data})
    }
}

export default function* watcherSaga() {
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}