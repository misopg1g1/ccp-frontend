import {
  GET_CUSTOMERS_REQUEST,
} from "../constants/actionTypes";

const initialState = {
  customer: [],
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return { ...state, fetching: true, customer: [] };
    default:
      return state;
  }
};
