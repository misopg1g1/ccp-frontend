import {
    ADD_INVENTORY_REQUEST,
} from '../constants/actionTypes'

export const addInventory = (productId: string, stock: string) => ({type: ADD_INVENTORY_REQUEST, productId, stock})