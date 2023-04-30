import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    CLEAN_MESSAGE
} from '../constants/actionTypes'

const initialState = {
    fetching: false,
    message: null,
    userData: null,
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return { ...state, fetching: true, error: null }
        case CREATE_USER_SUCCESS:
            return { ...state, fetching: false, userData: action.user }
        case CREATE_USER_FAIL:
            return { ...state, fetching: false, message: action.message }
        case CLEAN_MESSAGE:
            return { ...state, message: null }
        default:
            return state;
    }
}