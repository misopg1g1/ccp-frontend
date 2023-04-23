import {takeLatest, call, put} from 'redux-saga/effects'
import {
    ADD_INVENTORY_REQUEST,
    ADD_INVENTORY_SUCCESS,
    ADD_INVENTORY_FAIL
} from '../constants/actionTypes'
import { addInventory } from '../api/inventory'

function* addInventorySaga({productId, stock}) {
    try {
        const body = {stock}
        const {data} = yield call(addInventory, productId, body)
        if (data.error) {
            throw { data }
        }
        yield put({ type: ADD_INVENTORY_SUCCESS, data: data.data })
    } catch (error: any) {
        yield put({type: ADD_INVENTORY_FAIL, message: error.data})
    }
}

export default function* watcherSaga() {
    yield takeLatest(ADD_INVENTORY_REQUEST, addInventorySaga)
}