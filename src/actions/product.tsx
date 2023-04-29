import {
    CREATE_PRODUCT_REQUEST,
} from '../constants/actionTypes'

export const createProduct = (product: any) => ({type: CREATE_PRODUCT_REQUEST, product})