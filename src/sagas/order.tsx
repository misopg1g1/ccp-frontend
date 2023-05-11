import { call, put, takeLatest } from "redux-saga/effects";
import { checkData, handledError } from "../utils/handledResponse";
import { 
  GET_ORDERS_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SET_MESSAGE_ERROR 
} from "../constants/actionTypes";
import { getAllOrders } from "../api/order";

function* getAllOrdersSaga({ token }: { token: string }) {
  try {
    const { data } = yield call(getAllOrders, token);
    checkData(data);
    yield put({ type: GET_ORDERS_SUCCESS, orders: data });
  } catch (error) {
    const message = handledError(error);
    yield put({ type: GET_ORDERS_FAIL, orders: [] });
    yield put({ type: SET_MESSAGE_ERROR, message: message});
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_ORDERS_REQUEST, getAllOrdersSaga);
}