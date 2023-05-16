import { put, call, takeLatest } from "redux-saga/effects";
import {
  GET_SELLERS_FAIL,
  GET_SELLERS_REQUEST,
  GET_SELLERS_SUCCESS 
} from "../constants/actionTypes";
import { checkData, handledError } from "../utils/handledResponse";
import { getAllSellers } from "../api/seller";


function* getAllSellersSaga({ token }: { token: string }) {
  try {
    const { data } = yield call(getAllSellers, token);
    checkData(data);
    yield put({ type: GET_SELLERS_SUCCESS, sellers: data });
  } catch (error: any) {
    const message = handledError(error);
    yield put({ type: GET_SELLERS_FAIL, message: message });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_SELLERS_REQUEST, getAllSellersSaga);
}