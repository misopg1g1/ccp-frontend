import {
    LOGIN_REQUEST,
    INIT_LOGIN,
    LOGIN_CLEAN_ERRORS
} from '../constants/actionTypes'

export const login = ({credentials}) => ({type: LOGIN_REQUEST, credentials})
export const initLogin = () => ({ type: INIT_LOGIN })
export const cleanError = () => ({ type: LOGIN_CLEAN_ERRORS })