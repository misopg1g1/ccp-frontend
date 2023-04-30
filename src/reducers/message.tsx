import {
    CLEAN_MESSAGE,
    SET_MESSAGE_ERROR,
    SET_MESSAGE_SUCCESS,
} from "../constants/actionTypes"
  
const initialState = {
    message: null
};
  
export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_MESSAGE_SUCCESS:
        return { ...state, fetching: false, message: action.message }
    case SET_MESSAGE_ERROR:
        return { ...state, fetching: false, message: action.message }
    case CLEAN_MESSAGE:
        return { ...state, message: null }
    default:
        return state
    }
}
  