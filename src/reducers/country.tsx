import {
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  CLEAN_CITIES,
} from "../constants/actionTypes";

const initialState = {
  fetching: false,
  message: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST:
      return { ...state, fetching: true, error: null };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        countries: action.countries,
      };
    case GET_COUNTRIES_FAIL:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        countries: null,
      };
      case GET_CITIES_REQUEST:
        return { ...state, fetching: true, error: null };
      case GET_CITIES_SUCCESS:
        return {
          ...state,
          fetching: false,
          cities: action.cities,
        };
      case GET_CITIES_FAIL:
        return {
          ...state,
          fetching: false,
          isLoggedIn: true,
          cities: null,
        };
      case CLEAN_CITIES:
        return {
          ...state,
          fetching: false,
          isLoggedIn: true,
          cities: null,
        };
    default:
      return state;
  }
}
