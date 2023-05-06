import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  CLEAN_CITIES,
} from "../constants/actionTypes";
import { getAllCountries, getCitiesByCountry  } from "../api/country";

function* getAllCountriesSaga() {
  try {
    yield put({ type: CLEAN_CITIES });
    const { data } = yield call(getAllCountries);
    if (data.error) {
      throw { data };
    }
    yield put({ type: GET_COUNTRIES_SUCCESS, countries: data });
  } catch (error: any) {
    yield put({ type: GET_COUNTRIES_FAIL, message: error.data });
  }
}

function* getCitiesByCountrySaga({ country }: { country: string }) {
  try {
    const { data } = yield call(getCitiesByCountry, country);
    if (data.error) {
      throw { data };
    }
    yield put({ type: GET_CITIES_SUCCESS, cities: data });
  } catch (error: any) {
    yield put({ type: GET_CITIES_FAIL, message: error.data });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_COUNTRIES_REQUEST, getAllCountriesSaga);
  yield takeLatest(GET_CITIES_REQUEST, getCitiesByCountrySaga);
}