import {
    GET_CATEGORIES_REQUEST,
} from '../constants/actionTypes'

export const getAllCategories = (token: string) => ({type: GET_CATEGORIES_REQUEST, token})
