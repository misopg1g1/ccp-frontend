import {
  GET_VISITS_REQUEST,
} from "../constants/actionTypes";

export const getAllVisits = (token: string) => ({type: GET_VISITS_REQUEST, token});