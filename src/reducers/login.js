import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_CLEAN_ERRORS,
} from '../constants/actionTypes'

const initialState = {
    token: null,
    fetching: false,
    message: null,
    error: null,
    userData: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, fetching: true, error: null }
        case LOGIN_SUCCESS:
            return { ...state, fetching: false, isLoggedIn: true, token: action.token, userData: action.userData }
        case LOGIN_FAIL:
            return { ...state, fetching: false, message: null, error: action.error }
        case LOGIN_CLEAN_ERRORS:
            return { ...state, error: null }
        default:
            return state;
    }
}