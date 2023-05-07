import { 
  GET_VISITS_REQUEST,
  GET_VISITS_SUCCESS,
  GET_VISITS_FAIL,
} from "../constants/actionTypes";

const initialState = {
  fetching: false,
  message: null,
  customer: null,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_VISITS_REQUEST:
      return { 
        ...state,
        fetching: true,
        error: null };
    case GET_VISITS_SUCCESS:
      return {
        ...state,
        fetching: false,
        visits: action.visits,
      };
    case GET_VISITS_FAIL:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        visits: null,
      };
    default:
      return state;
  }
}