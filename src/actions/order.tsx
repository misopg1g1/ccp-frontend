import {
  GET_ORDERS_REQUEST
} from "../constants/actionTypes";

export const getAllOrders = (token: string) => ({ type: GET_ORDERS_REQUEST, token });