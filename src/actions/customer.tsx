import {
  GET_CUSTOMERS_REQUEST,
  CREATE_CUSTOMER_REQUEST,
} from "../constants/actionTypes"
import { Customer } from "../pages/customers/customer";

export const getAllCustomers = (token: string) => ({type: GET_CUSTOMERS_REQUEST, token});
export const createCustomer = (customer: Customer | null, token: string) => ({type: CREATE_CUSTOMER_REQUEST, customer, token});