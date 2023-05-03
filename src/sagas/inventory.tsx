import {takeLatest, call, put} from 'redux-saga/effects'
import {
    ADD_INVENTORY_REQUEST,
    ADD_INVENTORY_SUCCESS,
    ADD_INVENTORY_FAIL,
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_ERROR,
} from '../constants/actionTypes'
import { addInventory } from '../api/inventory'
import { handledError } from './handledResponse'

function* addInventorySaga({productId, stock, token}) {
    try {
        const body = {stock}
        const {data} = yield call(addInventory, productId, body, token)
        if (data.error) {
            throw { data }
        }
        yield put({ type: ADD_INVENTORY_SUCCESS, data: data.data })
        data.code = 'Proceso exitoso'
        data.msg = `El producto ${productId} fue actualizado exitosamente`
        yield put({ type: SET_MESSAGE_SUCCESS, message: data})
    } catch (error: any) {
        const message = handledError(error, 'Error actualizando el inventario');
        yield put({type: ADD_INVENTORY_FAIL})
        yield put({type: SET_MESSAGE_ERROR, message: message})
    }
}

export default function* watcherSaga() {
    yield takeLatest(ADD_INVENTORY_REQUEST, addInventorySaga)
}