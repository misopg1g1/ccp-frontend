import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAN_MESSAGE,
  LOGOUT,
} from "../constants/actionTypes";

const initialState = {
  token: null,
  fetching: false,
  message: null,
  userData: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, fetching: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        token: action.token,
        userData: action.userData,
      };
    case LOGIN_FAIL:
      return { ...state, fetching: false, message: action.message };
    case CLEAN_MESSAGE:
      return { ...state, message: null };
    case LOGOUT:
      return { ...state, isLoggedIn: false, token: undefined, userData: undefined };
    default:
      return state;
  }
}
