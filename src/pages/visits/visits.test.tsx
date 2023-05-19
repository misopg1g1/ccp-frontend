import { Provider } from 'react-redux';
import { describe, it } from "vitest";
import { render, screen, act } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import Visits from '../visits/visits';
import { LOGIN_SUCCESS } from '../../constants/actionTypes';

const userData = {
  access_token: "",
  data: {
    user: "John Doe"
  }
}

describe("<Visits />", () => {
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
          <Visits />
        </Provider>
      );
    });

    const welcomeTitle = screen.getByText(`Bienvenido ${userData.data.user}`);
    expect(welcomeTitle).toBeInTheDocument();

    const visitsCountTitle = screen.getByText("Total de visitas");
    expect(visitsCountTitle).toBeInTheDocument();

    const sellersCountTitle = screen.getByText("Vendedores");
    expect(sellersCountTitle).toBeInTheDocument();

    const tableTitle = screen.getByText("Todas las visitas");
    expect(tableTitle).toBeInTheDocument();
    
  });
});