import {takeLatest, call, put} from 'redux-saga/effects';
import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    SET_MESSAGE_ERROR,
    SET_MESSAGE_SUCCESS,
} from '../constants/actionTypes';
import { createUser } from '../api/user';
import { handledError, handleSucces } from './handledResponse';

function* createUserSaga({user, token}: {user: any, token: string}) {
    try {
        const body = {...user}
        const {data} = yield call(createUser, body, token)

        if (data.error) {
            throw { data }
        }
        yield put({ type: CREATE_USER_SUCCESS })
        const msg = `El usuario ${user.user} fue creado exitosamente`;
        yield put({ type: SET_MESSAGE_SUCCESS, message: handleSucces(msg) });
    } catch (error: any) {
        const message = handledError(error, 'Error creando el usuario')
        yield put({type: CREATE_USER_FAIL});
        yield put({type: SET_MESSAGE_ERROR, message: message})
    }
}

export default function* watcherSaga() {
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}