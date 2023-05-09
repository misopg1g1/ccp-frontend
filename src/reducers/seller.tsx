import {
  GET_SELLERS_REQUEST,
  GET_SELLERS_SUCCESS,
  GET_SELLERS_FAIL,
} from "../constants/actionTypes";

const initialState = {
  fetching: false,
  message: null,
  sellers: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_SELLERS_REQUEST:
      return { 
        ...state,
        fetching: true,
        error: null
      };
    case GET_SELLERS_SUCCESS: 
      return {
        ...state,
        fetching: false,
        sellers: action.sellers,
      };
    case GET_SELLERS_FAIL: 
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        sellers: null,
      };
    default:
      return state;
  }
}