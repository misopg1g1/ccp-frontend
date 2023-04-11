import {
    LOGIN_REQUEST
} from '../constants/actionTypes'

const initialState = {
    authenticated: false,
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state, isLoggedIn: true}
        default:
            return state;
    }
}