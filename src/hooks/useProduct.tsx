import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/product";

const useProduct = () => {
  const dispatch = useDispatch();
  const { message, fetching } = useSelector((state: any) => state.product);
  const getAllProductsFunc = (token: string) => dispatch(getAllProducts(token));

  return {
    message,
    fetching,
    getAllProductsFunc,
  };
};

export default useProduct;
