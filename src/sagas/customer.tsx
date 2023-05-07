import { call, put, takeLatest } from "redux-saga/effects";
import { 
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAIL,
  SET_MESSAGE_ERROR,
  SET_MESSAGE_SUCCESS,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_FAIL,
} from "../constants/actionTypes";
import { getCustomers, createCustomer } from "../api/customer"
import { handledError, handleSucces } from "./handledResponse";
import { Customer } from "../pages/customers/customer";

function* getAllCustomerSaga({ token }: { token: string}) {
  try {
    const { data } = yield call(getCustomers, token);
    if (data.error) {
      throw { data };
    }
    yield put({ type: GET_CUSTOMERS_SUCCESS, customers: data });
  } catch (error: any) {
    const message = handledError(error);
    yield put({ type: GET_CUSTOMERS_FAIL, customers: [] });
    yield put({ type: SET_MESSAGE_ERROR, message: message });
  }
}

function* createCustomerSaga({ customer, token }: {customer: Customer, token: string}) {
  try {
    const body = { ...customer };
    const { data } = yield call(createCustomer, body, token);
    if (data.error) {
      throw { data };
    }
    yield put({ type: CREATE_CUSTOMER_SUCCESS });
    const msg = `El cliente ${customer.first_name} fue creado exitosamente`;
    yield put({ type: SET_MESSAGE_SUCCESS, message: handleSucces(msg) });
    yield put({ type: GET_CUSTOMERS_REQUEST, token });
  } catch (error: any) {
    const message = handledError(error, 'Error creando el producto');
    yield put({ type: CREATE_CUSTOMER_FAIL });
    yield put({ type: SET_MESSAGE_ERROR, message: message });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_CUSTOMERS_REQUEST, getAllCustomerSaga);
  yield takeLatest(CREATE_CUSTOMER_REQUEST, createCustomerSaga);
}