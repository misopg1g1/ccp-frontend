import { Provider } from 'react-redux';
import { describe, it } from "vitest";
import { render, screen, fireEvent, act } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import Customers from '../customers/customers';
import { LOGIN_SUCCESS } from '../../constants/actionTypes';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../tests/mocks/i18n';

const userData = {
  access_token: "",
  data: {
    user: "John Doe"
  }
}

describe("<Customers />", () => {
  it("Should renders with the correct fields", async () => {
    const {store} = configureStore();
    store.dispatch({
      type: LOGIN_SUCCESS, 
      token: userData.access_token, 
      userData: userData.data 
    });
    await act(async () => {
      render(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Customers />
          </Provider>
        </I18nextProvider>
      );
    });

    const welcomeTitle = screen.getByText(`Bienvenido ${userData.data.user}`);
    expect(welcomeTitle).toBeInTheDocument();

    const customerCountTitle = screen.getByText("Total de clientes");
    expect(customerCountTitle).toBeInTheDocument();

    const tableTitle = screen.getByText("Todos los clientes");
    expect(tableTitle).toBeInTheDocument();
    
  });
});