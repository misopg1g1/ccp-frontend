import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "../constants/actionTypes";

const initialState = {
  fetching: false,
  message: null,
  orders: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { 
        ...state,
        fetching: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        orders: action.orders,
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        fetching: false,
        orders: null,
        message: action.message
      };
    default:
      return state;
  }
};