import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
} from "../constants/actionTypes";
import { getAllProducts } from "../api/product";

function* getAllProductsSaga({ token }: { token: string }) {
  try {
    const { data } = yield call(getAllProducts, token);
    if (data.error) {
      throw { data };
    }
    yield put({ type: GET_PRODUCT_SUCCESS, products: data });
  } catch (error: any) {
    yield put({ type: GET_PRODUCT_FAIL, message: error.data });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_PRODUCT_REQUEST, getAllProductsSaga);
}
