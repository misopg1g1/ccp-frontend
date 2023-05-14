import { act } from "react-dom/test-utils";
import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAIL,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
} from "../constants/actionTypes";

const initialState = {
  fetching: false,
  message: null,
  customer: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return { ...state, fetching: true, error: null, customer: null };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        customers: action.customers,
      };
    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        customers: null,
      };
    case CREATE_CUSTOMER_REQUEST:
      return { ...state, fetching: true, error: null, customer: action.customer };
    case CREATE_CUSTOMER_SUCCESS:
      return { ...state, fetching: false, customerData: action.customer };
    case CREATE_CUSTOMER_FAIL:
      return { ...state, fetching: false, message: action.message };
    default:
      return state;
  }
};
