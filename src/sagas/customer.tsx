import { call, put, takeLatest, delay, takeEvery } from "redux-saga/effects";
import { 
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAIL,
  SET_MESSAGE_ERROR,
} from "../constants/actionTypes";
import { getCustomers } from "../api/customer"
import { handledError } from "./handledResponse";

function* getAllCustomerSaga({ token }: { token: string}) {
  try {
    const { data } = yield call(getCustomers, token);
    if (data.error) {
      throw { data };
    }
    yield put({ type: GET_CUSTOMERS_SUCCESS, customers: data })
  } catch (error: any) {
    const message = handledError(error);
    yield put({ type: GET_CUSTOMERS_FAIL, customers: [] });
    yield put({ type: SET_MESSAGE_ERROR, message: message });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_CUSTOMERS_REQUEST, getAllCustomerSaga);
}