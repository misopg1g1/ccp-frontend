import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
} from "../constants/actionTypes";

const initialState = {
  product: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return { ...state, fetching: true, error: null };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        products: action.products,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        products: null,
      };
    default:
      return state;
  }
}
