import {
  GET_CUSTOMERS_REQUEST
} from "../constants/actionTypes"

export const getAllCustomers = (token: string) => ({type: GET_CUSTOMERS_REQUEST, token});