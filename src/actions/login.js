import {
    LOGIN_REQUEST
} from '../constants/actionTypes';

export const login = ({credentials}) => ({type: LOGIN_REQUEST, credentials});