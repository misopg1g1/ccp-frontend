import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCT_SUCCESS,
} from "../constants/actionTypes";
import { getAllProducts } from "../api/product";
import { createProduct } from "../api/product";
import { getAllCategories } from "../api/category";

function* getAllCategoriesSaga({ token }: { token: string }) {
  try {
    const { data } = yield call(getAllCategories, token);
    if (data.error) {
      throw { data };
    }
    yield put({ type: GET_CATEGORIES_SUCCESS, products: data });
  } catch (error: any) {
    yield put({ type: GET_CATEGORIES_FAIL, message: error.data });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getAllCategoriesSaga);
}
