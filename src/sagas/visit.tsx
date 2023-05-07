import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_VISITS_REQUEST,
  GET_VISITS_FAIL,
  GET_VISITS_SUCCESS,
  SET_MESSAGE_ERROR,
} from "../constants/actionTypes";
import { getAllVisits } from "../api/visit";
import { handledError } from "./handledResponse";

function* getAllVisitsSaga({ token }: { token: string }) {
  try {
    const { data } = yield call(getAllVisits, token);
    if (data.error) {
      throw { data };
    }
    yield put({ type: GET_VISITS_SUCCESS, visits: data });
  } catch (error: any) {
    const message = handledError(error);
    yield put({ type: GET_VISITS_FAIL, visits: [] });
    yield put({ type: SET_MESSAGE_ERROR, message: message });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_VISITS_REQUEST, getAllVisitsSaga);
}