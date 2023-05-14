import {
    ADD_INVENTORY_SUCCESS,
    ADD_INVENTORY_FAIL
} from '../constants/actionTypes'

const initialState = {
    message: null,
    productData: null,
    stock: 0
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case ADD_INVENTORY_SUCCESS:
            return {...state, response: { success: true, stock: action.stock }}
        case ADD_INVENTORY_FAIL:
            return {...state, response: { success: false, stock: action.message }}
        default:
            return state
    }
}