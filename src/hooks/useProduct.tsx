import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/product";
import { createProduct } from '../actions/product'

const useProduct = () => {
  const dispatch = useDispatch();
  const { message, fetching } = useSelector((state: any) => state.product);
  const getAllProductsFunc = (token: string) => dispatch(getAllProducts(token));
  const createProductFunc = (product: any, token: string) => dispatch(createProduct(product, token));

  return {
    message,
    fetching,
    getAllProductsFunc,
    createProductFunc,
  };
};

export default useProduct
