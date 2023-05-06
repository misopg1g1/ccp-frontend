import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../actions/customer";
import { createCustomer } from '../actions/customer'

const useCustomer = () => {
  const dispatch = useDispatch();
  const { message, fetching } = useSelector((state: any) => state.customer);
  const getAllCustomersFunc = (token: string) => dispatch(getAllCustomers(token));
  const createCustomerFunc = (customer: any, token: string) => dispatch(createCustomer(customer, token));

  return {
    message,
    fetching,
    getAllCustomersFunc,
    createCustomerFunc,
  };
};

export default useCustomer
