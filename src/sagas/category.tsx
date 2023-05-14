import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
} from "../constants/actionTypes";
import { getAllCategories } from "../api/category";
import {checkData} from "../utils/handledResponse";

function* getAllCategoriesSaga({ token }: { token: string }) {
  try {
    const { data } = yield call(getAllCategories, token);
    checkData(data);
    yield put({ type: GET_CATEGORIES_SUCCESS, products: data });
  } catch (error: any) {
    yield put({ type: GET_CATEGORIES_FAIL, message: error.data });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_CATEGORIES_REQUEST, getAllCategoriesSaga);
}
