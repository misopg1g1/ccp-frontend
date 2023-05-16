import {takeLatest, call, put} from 'redux-saga/effects'
import {
    ADD_INVENTORY_REQUEST,
    ADD_INVENTORY_SUCCESS,
    ADD_INVENTORY_FAIL,
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_ERROR,
    GET_PRODUCT_REQUEST,
} from '../constants/actionTypes'
import { addInventory } from '../api/inventory'
import { handledError, handleSuccess, checkData} from '../utils/handledResponse'

function* addInventorySaga({productId, stock, token} : { productId: string, stock: number, token: string }) {
    try {
        const body = {stock}
        const {data} = yield call(addInventory, productId, body, token)
        checkData(data);
        yield put({ type: ADD_INVENTORY_SUCCESS, data: data.data })
        const msg = `El producto ${productId} fue actualizado exitosamente`
        yield put({ type: SET_MESSAGE_SUCCESS, message: handleSuccess(msg)})
        yield put({ type: GET_PRODUCT_REQUEST, token });
    } catch (error: any) {
        const message = handledError(error, 'Error actualizando el inventario');
        yield put({type: ADD_INVENTORY_FAIL})
        yield put({type: SET_MESSAGE_ERROR, message: message})
    }
}

export default function* watcherSaga() {
    yield takeLatest(ADD_INVENTORY_REQUEST, addInventorySaga)
}