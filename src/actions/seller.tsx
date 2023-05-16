import {
  GET_SELLERS_REQUEST,
} from "../constants/actionTypes";

export const getAllSellers = (token: string) => ({type: GET_SELLERS_REQUEST, token});