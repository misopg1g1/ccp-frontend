import {
    CREATE_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST
} from '../constants/actionTypes'

export const getAllProducts = (token: string) => ({type: GET_PRODUCT_REQUEST, token})
export const createProduct = (product: any, token: string) => ({type: CREATE_PRODUCT_REQUEST, product, token})
