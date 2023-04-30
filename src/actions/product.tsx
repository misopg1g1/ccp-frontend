import {
    CREATE_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST
} from '../constants/actionTypes'

export const createProduct = (product: any) => ({type: CREATE_PRODUCT_REQUEST, product})

export const getAllProducts = (token: string) => ({type: GET_PRODUCT_REQUEST, token})