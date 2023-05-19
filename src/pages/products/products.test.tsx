import { Provider } from 'react-redux';
import { describe, it } from "vitest";
import { render, screen, act } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import Products from '../products/products';
import { LOGIN_SUCCESS } from '../../constants/actionTypes';

const userData = {
  access_token: "",
  data: {
    user: "John Doe"
  }
}

describe("<Products />", () => {
  it("Should renders with the correct fields", async () => {
    const {store} = configureStore();
    store.dispatch({
      type: LOGIN_SUCCESS, 
      token: userData.access_token, 
      userData: userData.data 
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <Products />
        </Provider>
      );
    });

    const welcomeTitle = screen.getByText(`Bienvenido ${userData.data.user}`);
    expect(welcomeTitle).toBeInTheDocument();

    const productsCountTitle = screen.getByText("Total de Productos");
    expect(productsCountTitle).toBeInTheDocument();

    const categoriesCountTitle = screen.getByText("Categorias");
    expect(categoriesCountTitle).toBeInTheDocument();

    const warehousesCountTitle = screen.getByText("Bodegas");
    expect(warehousesCountTitle).toBeInTheDocument();

    const tableTitle = screen.getByText("Todos los Productos");
    expect(tableTitle).toBeInTheDocument();
    
  });
});