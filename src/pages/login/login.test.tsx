import { Provider } from 'react-redux';
import { describe, it, vi } from "vitest";
import { render, screen, act,fireEvent } from "../../utils/test-utils";
import configureStore from '../../configureStore';
import Login from '../login/login';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../tests/mocks/i18n';

describe("<Login />", () => {
  it("Should renders with the correct fields", async () => {
    const {store} = configureStore();
    await act(async () => {
      render(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Login />
          </Provider>
        </I18nextProvider>
      );
    });

    const welcomeTitle = screen.getByText("Bienvenido!");
    expect(welcomeTitle).toBeInTheDocument();

    const systemTitle = screen.getByText("Sistema CCP v1.0");
    expect(systemTitle).toBeInTheDocument();

    const loginTitle = screen.getByText("Iniciar Sesión");
    expect(loginTitle).toBeInTheDocument();

    const userInput = screen.getByText("Usuario");
    expect(userInput).toBeInTheDocument();
    
    const passwordInput = screen.getByText("Contraseña");
    expect(passwordInput).toBeInTheDocument();

    const button = screen.getByText(/Ingresar/i)
    expect(button).toBeInTheDocument();
  });

  it("Should login an user", async () => {
    const { store } = configureStore();
    await act(async () => {
      render(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <Login />
          </Provider>
        </I18nextProvider>
      );
    });

    // Fill form
    const userInput = screen.getByLabelText("Usuario");
    fireEvent.change(userInput, { target: { value: 'admin' } });

    const passwordInput = screen.getByLabelText("Contraseña");
    fireEvent.change(passwordInput, { target: { value: '111111' } });

    // Click on create customer
    const button = screen.getByText(/Ingresar/i);
    fireEvent.click(button);

    // Asserts
    const state = store.getState();
    expect(state.login.fetching).toBeTruthy();
  });
});