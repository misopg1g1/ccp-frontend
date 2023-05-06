import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAIL,
} from "../constants/actionTypes";

const initialState = {
  fetching: false,
  message: null,
  customer: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return { ...state, fetching: true, error: null };
    case GET_CUSTOMERS_SUCCESS:
      console.log('GET_CUSTOMERS_SUCCESS')
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
    default:
      return state;
  }
};
