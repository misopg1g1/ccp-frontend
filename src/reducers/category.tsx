import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
} from "../constants/actionTypes";

const initialState = {
  fetching: false,
  message: null,
  categories: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { ...state, fetching: true, error: null };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        categories: action.products,
      };
    case GET_CATEGORIES_FAIL:
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
