import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  SET_MESSAGE_ERROR,
  SET_MESSAGE_SUCCESS,
} from "../constants/actionTypes";
import { getAllProducts, createProduct } from "../api/product";
import { handledError, handleSuccess, checkData } from '../utils/handledResponse';

function* getAllProductsSaga({ token }: { token: string }) {
  try {
    const { data } = yield call(getAllProducts, token);
    checkData(data);
    yield put({ type: GET_PRODUCT_SUCCESS, products: data });
  } catch (error: any) {
    const message = handledError(error);
    yield put({ type: GET_PRODUCT_FAIL, message: message });
  }
}

function* createProductSaga({ product, token }: {product: any, token: string}) {
  try {
    const body = { ...product };
    const { data } = yield call(createProduct, body, token);
    checkData(data);
    yield put({ type: CREATE_PRODUCT_SUCCESS });
    const msg = `El producto ${product.name} fue creado exitosamente`;
    yield put({ type: SET_MESSAGE_SUCCESS, message: handleSuccess(msg) });
    yield put({ type: GET_PRODUCT_REQUEST, token });
  } catch (error: any) {
    const message = handledError(error, 'Error creando el producto');
    yield put({ type: CREATE_PRODUCT_FAIL });
    yield put({ type: SET_MESSAGE_ERROR, message: message });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_PRODUCT_REQUEST, getAllProductsSaga);
  yield takeLatest(CREATE_PRODUCT_REQUEST, createProductSaga);
}
