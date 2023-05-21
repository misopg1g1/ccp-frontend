import { Provider } from 'react-redux';
import { describe, it } from "vitest";
import { render, screen, act } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import Orders from '../orders/orders';
import { LOGIN_SUCCESS } from '../../constants/actionTypes';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../tests/mocks/i18n';

const userData = {
  access_token: "",
  data: {
    user: "John Doe"
  }
}

describe("<Orders />", () => {
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
            <Orders />
          </Provider>
        </I18nextProvider>
      );
    });

    const welcomeTitle = screen.getByText(`Bienvenido ${userData.data.user}`);
    expect(welcomeTitle).toBeInTheDocument();

    const ordersCountTitle = screen.getByText("Total de ordenes");
    expect(ordersCountTitle).toBeInTheDocument();

    const deliveredOrdersCountTitle = screen.getByText("Ordenes entregadas");
    expect(deliveredOrdersCountTitle).toBeInTheDocument();

    const pendingOrdersCountTitle = screen.getByText("Ordenes pendientes por entregar");
    expect(pendingOrdersCountTitle).toBeInTheDocument();

    const tableTitle = screen.getByText("Todas las ordenes");
    expect(tableTitle).toBeInTheDocument();
    
  });
});